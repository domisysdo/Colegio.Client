
export class NgxDatatableHelper {

    static selectedCount = 0;
    static columnMode = 'force';
    static headerHeight = '50';
    static footerHeight = '50';
    static rowHeight = 'auto';
    static selectionType = 'checkbox';
    static selectAllRowsOnPage = false;
    static reorderable = 'reorderable';
    static externalPaging = true;
    static externalSorting = true;
    static ngxDatatableMesagges = {
        'emptyMessage': 'Sin registros',
        'totalMessage': 'Total',
        'selectedMessage': ''
    };


    static selectedCountMessages(selectedCount: number) {
        this.selectedCount = selectedCount;
        NgxDatatableHelper.ngxDatatableMesagges.selectedMessage = NgxDatatableHelper.selectedCount === 1 ? 'seleccionado' : 'seleccionados';
    }
}
