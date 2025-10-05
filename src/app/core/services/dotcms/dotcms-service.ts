import {Injectable} from '@angular/core';
import {DotCMSClient} from '@dotcms/angular';
import {createDotCMSClient} from '@dotcms/client';
import {environment} from '../../../../environments/environment';
import {Blog} from '../../models/Blog';
import {dotcmsErrorHelper} from '../../helpers/dotcms.error.helper';
import {GLOBAL_CONSTANTS} from '../../constants/global';


@Injectable({
  providedIn: 'root'
})
export class DotcmsService {

  private readonly dotcmsClient: DotCMSClient;

  constructor() {
    this.dotcmsClient = createDotCMSClient({
      authToken: environment.DOTCMS_AUTH_TOKEN,
      dotcmsUrl: environment.DOTCMS_URL,
    })
  }


  async getBlogsWithPagination(page: number = 1, limit: number = 2,) {
    try {
      const result = await this.dotcmsClient.content
        .getCollection<Blog>(GLOBAL_CONSTANTS.DOTCMS_CONTENT_TYPES.BLOG)
        .page(page)
        .limit(limit)
        .query('publishDate desc')

      return {
        data: result,
        error: ""
      };
    } catch (e: unknown) {
      return {
        data: null,
        error: dotcmsErrorHelper(e)
      }
    }
  }

}
