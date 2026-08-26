import * as WebBrowser from 'expo-web-browser';

export async function openOfficialSite(url: string) {
  await WebBrowser.openBrowserAsync(url, {
    presentationStyle: WebBrowser.WebBrowserPresentationStyle.PAGE_SHEET,
  });
}
