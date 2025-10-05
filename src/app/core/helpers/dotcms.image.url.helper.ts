import { environment } from '../../../environments/environment';

type GetDotcmsImagePayload = {
  imageId: string; // inode or asset identifier
  width: number;   // in px
  height: number;  // in px
  quality: number; // 1–100
  format: 'png' | 'jpg' | 'jpeg' | 'webp' | 'avif';
  languageId?: string | number; // still optional (for localized assets)
};

export const dotCmsGetImageHelper = (payload: GetDotcmsImagePayload): string => {
  const baseDotcmsUrl = environment.DOTCMS_URL;
  const { imageId, width, height, quality, format, languageId } = payload;

  // build URL with required transformations
  let url = `${baseDotcmsUrl}/dA/${imageId}/${format}/${width}w/${height}h/${quality}q`;

  // optional language
  if (languageId) {
    url += `?language_id=${languageId}`;
  }
  return url;
};
