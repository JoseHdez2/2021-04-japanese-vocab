import axios from "axios";

export class GoogleImageSearch {
  private readonly apiKey: string;
  private readonly searchEngineId: string;

  constructor(apiKey: string, searchEngineId: string) {
    this.apiKey = apiKey;
    this.searchEngineId = searchEngineId;
  }

  public async getImageUrls(searchString: string) {
    try {
      const res: {
        status: number;
        data: {
          items: Array<{ link: string; title: string }>;
        };
      } = await axios.get(`https://www.googleapis.com/customsearch/v1?key=${this.apiKey}&q=
    ${searchString}&cx=${this.searchEngineId}&searchType=image&enableImageSearch=true`);

      if (res?.data?.items?.length > 0) {
        return res.data.items.map((it) => it.link);
      } else {
        return "No image found.";
      }
    } catch (err) {
      return err;
    }
  }

  public async getImageUrl(searchString: string) {
    let urls = await this.getImageUrls(searchString);
    return Array.isArray(urls) ? urls[0] : urls;
  }
}
