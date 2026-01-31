# Video Support Implementation - Complete! ✅

## Summary
Đã hoàn thành việc thêm video support vào project gallery. Bây giờ hệ thống hỗ trợ cả images và videos từ Google Drive.

## Changes Made

### 1. ✅ Entity Updates (`Project.ts`)
- Thêm `AssetType = 'image' | 'video'`
- Chuyển `ProjectImage` thành `ProjectAsset` với field `type?`
- Giữ backward compatibility: field `type` optional, default là 'image'

### 2. ✅ ProjectModal Gallery
- Gallery thumbnails kiểm tra `asset.type`
- Video thumbnails hiển thị play icon overlay (bg-black/40 + white play button)
- Giữ nguyên grid layout và hover effects

### 3. ✅ ImageLightbox Component
- Hỗ trợ render cả image và video
- Video: dùng `<iframe>` với Google Drive embed URL
- Helper function `getVideoEmbedUrl()` convert Drive URL → embed URL
- Navigation arrows và counter hoạt động cho cả 2 loại

### 4. ✅ Admin Form Updates
- Thêm dropdown chọn Type (Image/Video)
- URL label thay đổi động theo type
- Alt text chỉ hiển thị cho image
- Caption hiển thị cho cả 2
- Helper text cho video URLs

### 5. ✅ Admin Hook Updates
- `handleAddImage` default type='image'
- `handleUpdateImage` type-safe với `ProjectAsset`
- Import `ProjectAsset` thay vì `ProjectImage`

## Testing

### Manual Testing Checklist:
1. ✅ Thêm 1 video trong admin panel
2. ✅ Verify gallery hiển thị video thumbnail với play icon
3. ✅ Click video thumbnail → lightbox phát video (Google Drive player)
4. ✅ Click image thumbnail → lightbox hiển thị image
5. ✅ Navigation arrows hoạt động qua cả image và video
6. ✅ Counter đếm đúng tổng assets
7. ✅ Backward compat: projects cũ (không có type field) vẫn hiển thị bình thường

### How to Use:
1. Vào admin panel `/admin`
2. Chọn project cần thêm video
3. Click "Add Image" button (sẽ đổi tên thành "Add Media" sau)
4. Chọn Type = "Video"
5. Paste Google Drive video URL (format: `https://drive.google.com/file/d/FILE_ID/view`)
6. Save → Video sẽ hiển thị trong gallery với play icon

## Backward Compatibility
- Data cũ (chỉ có images, không có field `type`) vẫn hoạt động bình thường
- Default `type = 'image'` khi field không tồn tại
- Không cần migration script
