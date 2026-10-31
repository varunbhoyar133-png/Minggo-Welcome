Add-Type -AssemblyName System.Drawing

$src = "C:\Users\XIAOMI NOTEBOOK 14\.gemini\antigravity-ide\brain\bab36cc0-c439-47cd-8783-1841d0751cbd\.user_uploaded\media_1793123165062.jpg"
$destOriginal = "c:\Users\XIAOMI NOTEBOOK 14\Desktop\Varun Bhoyar\Projects\Invitation\public\minggo-logo-original.jpg"
$destAssets = "c:\Users\XIAOMI NOTEBOOK 14\Desktop\Varun Bhoyar\Projects\Invitation\src\assets\minggo-logo-original.jpg"
$destPng = "c:\Users\XIAOMI NOTEBOOK 14\Desktop\Varun Bhoyar\Projects\Invitation\public\minggo-logo.png"
$destAssetsPng = "c:\Users\XIAOMI NOTEBOOK 14\Desktop\Varun Bhoyar\Projects\Invitation\src\assets\minggo-logo.png"

# Copy original file intact
Copy-Item -Path $src -Destination $destOriginal -Force
Copy-Item -Path $src -Destination $destAssets -Force

# Create transparent PNG version
$bmp = [System.Drawing.Bitmap]::FromFile($src)
$w = $bmp.Width
$h = $bmp.Height
Write-Output "Processing logo: $w x $h"

# Create a transparent bitmap
$newBmp = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Crop bounds
$minX = $w; $minY = $h; $maxX = 0; $maxY = 0

for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
        $pixel = $bmp.GetPixel($x, $y)
        $r = $pixel.R
        $g = $pixel.G
        $b = $pixel.B
        $brightness = [Math]::Max($r, [Math]::Max($g, $b))
        
        # Black background threshold
        if ($brightness -lt 25) {
            # Fully transparent black
            $newBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        } elseif ($brightness -lt 55) {
            # Smooth feather edge
            $alpha = [int](($brightness - 25) / 30.0 * 255.0)
            $newBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $r, $g, $b))
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        } else {
            # Lettering / graphics
            $newBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $r, $g, $b))
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

$bmp.Dispose()

# Save transparent version
$newBmp.Save($destPng, [System.Drawing.Imaging.ImageFormat]::Png)
$newBmp.Save($destAssetsPng, [System.Drawing.Imaging.ImageFormat]::Png)

Write-Output "Bounding box: X=$minX..$maxX, Y=$minY..$maxY"

# Also create tightly cropped version for high-DPI header/navbar usage
$pad = 20
$cropX = [Math]::Max(0, $minX - $pad)
$cropY = [Math]::Max(0, $minY - $pad)
$cropW = [Math]::Min($w - $cropX, ($maxX - $minX) + ($pad * 2))
$cropH = [Math]::Min($h - $cropY, ($maxY - $minY) + ($pad * 2))

$rect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)
$croppedBmp = $newBmp.Clone($rect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$croppedDest = "c:\Users\XIAOMI NOTEBOOK 14\Desktop\Varun Bhoyar\Projects\Invitation\public\minggo-logo-tight.png"
$croppedDestAssets = "c:\Users\XIAOMI NOTEBOOK 14\Desktop\Varun Bhoyar\Projects\Invitation\src\assets\minggo-logo-tight.png"
$croppedBmp.Save($croppedDest, [System.Drawing.Imaging.ImageFormat]::Png)
$croppedBmp.Save($croppedDestAssets, [System.Drawing.Imaging.ImageFormat]::Png)
$croppedBmp.Dispose()
$newBmp.Dispose()

Write-Output "Successfully saved original, transparent, and cropped logos."
