# Profile Setup Guide

## Adding Your Profile Picture

1. **Prepare your image:**
   - Use a high-quality, professional headshot
   - Recommended size: 400x400 pixels or larger
   - Format: JPG, PNG, or WebP
   - Make sure it's a square image or crop it to square

2. **Add to the project:**
   - Save your image as `rohit-avatar.jpg` (or .png)
   - Place it in the `project/public/` folder
   - The file path should be: `project/public/rohit-avatar.jpg`

3. **Alternative names:**
   - If you prefer a different filename, update the `src` attribute in `App.tsx` line ~290
   - Current path: `src="/rohit-avatar.jpg"`

## Adding Your Resume

1. **Prepare your resume:**
   - Save as PDF format
   - Name it `resume.pdf`
   - Place it in the `project/public/` folder

2. **Update resume links:**
   - The resume modal will automatically use `/resume.pdf`
   - Update the download link in the modal if needed

## File Structure After Setup

```
project/
├── public/
│   ├── rohit-avatar.jpg    ← Your profile picture
│   ├── resume.pdf          ← Your resume
│   ├── _redirects
│   └── index.html
└── src/
    └── App.tsx
```

## Features Now Working

✅ **Smooth Navigation:** All menu links now smoothly scroll to sections
✅ **Profile Picture:** Ready for your image with fallback initials
✅ **Resume Download:** Ready for your PDF
✅ **Contact Links:** All social links are active
✅ **Mobile Responsive:** Works perfectly on all devices

## Testing

After adding your files:
1. Run `npm run dev` to test locally
2. Your profile picture should appear in the hero section
3. All navigation links should smoothly scroll to sections
4. Resume modal should show your PDF
5. All contact links should work

## Deployment

Once you've added your files:
1. Commit and push to GitHub
2. Netlify will automatically redeploy
3. Your portfolio will be live with your actual content! 