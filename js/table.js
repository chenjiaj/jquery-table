/**
 * Created with JetBrains PhpStorm.
 * Desc:
 * Author: chenjiajun
 * Date: 14-12-9
 * Time: 上午9:22
 */
(function(){
    $.extend(true,Table.prototype,{
        setTableData:function(){
            var _this = this;
            var option = this.option;
            var res = option.res;
            var curr = option.currPage;
            option.table.find("tr:has(td)").remove();
            for(var i = curr*option.pageSize; i<res.length && i<option.pageSize + curr*option.pageSize ; i++){
                var trdata = res[i];
                var tr = $("<tr></tr>");
                $(trdata).each(function(index){
                    if(index == 0 && option.showIndex){
                        tr.append('<td>'+(i+1)+'</td>');
                    }
                    tr.append('<td>'+trdata[index]+'</td>');
                });
                option.table.append(tr);
            }
            _this.setPage();
            _this.tableStyle();
        }
    });
    var Jtable = new Table({
        table: $("#table"),
        tableArea: $("#table-area"),
        showIndex:true,
        pageSize:10,
        showIndexContent:'编号'

    });
    Jtable.loadData('../js/table.json','table');

})();