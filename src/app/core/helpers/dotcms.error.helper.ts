import {DotErrorPage, DotHttpError, DotErrorContent, DotErrorNavigation} from '@dotcms/types';

type ErrorResponse = {
  httpCode: number,
  message: string,
}


export const dotcmsErrorHelper = (error: unknown): string => {
  if (error instanceof DotErrorPage) {
    return `Page Error dotcms ${error.message}`;
  }

  if (error instanceof DotHttpError) {
    return `Http Error Error dotcms ${error.message}`
  }

  if (error instanceof DotErrorContent) {
    return `Content Error dotcms ${error.message}`
  }

  if (error instanceof DotErrorNavigation) {
    return `Navigation Error dotcms ${error.message}`
  }

  return 'Unknown dot cms error';

}
