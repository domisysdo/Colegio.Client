import { ColegioTemplatePage } from './app.po';

describe('Colegio App', function() {
  let page: ColegioTemplatePage;

  beforeEach(() => {
    page = new ColegioTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
