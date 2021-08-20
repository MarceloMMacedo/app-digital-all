export class PrintCs {
  _printStyle: any[];
  useExistingCss: boolean;
  printDelay: number;
  private _styleSheetFile: string;
  printSectionId: string;
  printTitle: any;
  constructor() {
    this._printStyle = [];
    /**
     *
     *
     * \@memberof NgxPrintDirective
     */
    this.useExistingCss = false;
    /**
     * A delay in milliseconds to force the print dialog to wait before opened. Default: 0
     *
     * \@memberof NgxPrintDirective
     */
    this.printDelay = 0;
    /**
     *
     *
     * @return html for the given tag
     *
     * \@memberof NgxPrintDirective
     */
    this._styleSheetFile = '';
  }
  /**
   *
   *
   * \@memberof NgxPrintDirective
   * @param {?} values
   * @return {?}
   */
  set printStyle(values) {
    for (let key in values) {
      if (values.hasOwnProperty(key)) {
        this._printStyle.push((key + JSON.stringify(values[key])).replace(/['"]+/g, ''));
      }
    }
    this.returnStyleValues();
  }
  /**
   *
   *
   * \@memberof NgxPrintDirective
   * @return {?} the string that create the stylesheet which will be injected
   * later within <style></style> tag.
   *
   * -join/replace to transform an array objects to css-styled string
   *
   */
  returnStyleValues() {
    return `<style> ${this._printStyle.join(' ').replace(/,/g, ';')} </style>`;
  }
  /**
   * \@memberof NgxPrintDirective
   * @param {?} cssList
   * @return {?}
   */
  set styleSheetFile(cssList) {
    /** @type {?} */
    let linkTagFn = (/**
     * @param {?} cssFileName
     * @return {?}
     */
      function (cssFileName) {
        return `<link rel="stylesheet" type="text/css" href="${cssFileName}">`;
      });
    if (cssList.indexOf(',') !== -1) {
      /** @type {?} */
      const valueArr = cssList.split(',');
      for (let val of valueArr) {
        this._styleSheetFile = this._styleSheetFile + linkTagFn(val);
      }
    }
    else {
      this._styleSheetFile = linkTagFn(cssList);
    }
  }
  /**
   * @private
   * @return {?} string which contains the link tags containing the css which will
   * be injected later within <head></head> tag.
   *
   */
  returnStyleSheetLinkTags() {
    return this._styleSheetFile;
  }
  /**
   * @private
   * @param {?} tag
   * @return {?}
   */
  getElementTag(tag) {
    /** @type {?} */
    const html = [];
    /** @type {?} */
    const elements = document.getElementsByTagName(tag);
    for (let index = 0; index < elements.length; index++) {
      html.push(elements[index].outerHTML);
    }
    return html.join('\r\n');
  }
  /**
   *
   * @private
   * @param {?} data the html element collection to save defaults to
   *
   * @return {?}
   */
  getFormData(data) {
    for (var i = 0; i < data.length; i++) {
      data[i].defaultValue = data[i].value;
      if (data[i].checked) {
        data[i].defaultChecked = true;
      }
    }
  }
  /**
   * @private
   * @return {?} html section to be printed along with some associated inputs
   *
   */
  getHtmlContents() {
    /** @type {?} */
    let printContents = document.getElementById(this.printSectionId);
    /** @type {?} */
    let innards = printContents.getElementsByTagName('input');
    this.getFormData(innards);
    /** @type {?} */
    let txt = printContents.getElementsByTagName('textarea');
    this.getFormData(txt);
    return printContents.innerHTML;
  }
  /**
   *
   *
   * \@memberof NgxPrintDirective
   * @return {?}
   */
  public print(printSec ) {
    console.log(printSec);

    this.printSectionId=printSec;
    /** @type {?} */
    let printContents;
    /** @type {?} */
    let popupWin;
    /** @type {?} */
    let styles = '';
    /** @type {?} */
    let links = '';
    /** @type {?} */
    const baseTag = this.getElementTag('base');
    if (this.useExistingCss) {
      styles = this.getElementTag('style');
      links = this.getElementTag('link');
    }
    printContents = this.getHtmlContents();
    popupWin = window.open("", "_blank", "top=0,left=0,height=auto,width=auto");
    popupWin.document.open();
    popupWin.document.write(`
  <html>
    <head>
      <title>${this.printTitle ? this.printTitle : ""}</title>
      ${baseTag}
      ${this.returnStyleValues()}
      ${this.returnStyleSheetLinkTags()}
      ${styles}
      ${links}
    </head>
    <body>
      ${printContents}
      <script defer>
        function triggerPrint(event) {
          window.removeEventListener('load', triggerPrint, false);
          setTimeout(function() {
            closeWindow(window.print());
          }, ${this.printDelay});
        }
        function closeWindow(){
            window.close();
        }
        window.addEventListener('load', triggerPrint, false);
      </script>
    </body>
  </html>`);
    popupWin.document.close();
  }
}
