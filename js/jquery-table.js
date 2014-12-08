/**
 * Created with JetBrains PhpStorm.
 * Desc:
 * Author: chenjiajun
 * Date: 14-12-8
 * Time: 上午9:57
 */
(function(){
    var table = {
        table: $("#table"),
        tableArea: $("#table-area"),
        loadUrl:'../js/table.json',
        pageCount:null,
        pageSize:10,
        totalSize:null,
        pageUl:null,
        currPage:0,
        res:null,
        init: function(){
            this.loadData(this.loadUrl);
            this.bindEvent();
        },
        bindEvent:function(){
            var _this = this;
            $(_this.tableArea).on('click',"#prev",function(){
                _this.prevPage();
            });
            $(_this.tableArea).on('click',"#next",function(){
                _this.nextPage();
            });
            $(_this.tableArea).on('click',".page",function(){
                _this.skipPage(this);
            });
        },
        tableStyle:function(){
            this.table.find("tr:odd").css({"background":"#ddd"});
        },
        loadData: function(url){
            var _this = this;
            $.post(url,function(res){
                var res = res.table;
                _this.res = res;
                _this.totalSize = res.length;
                _this.setTableData();
            });
        },
        setTableData:function(){
            var _this = this;
            var res = _this.res;
            var curr = _this.currPage;
            _this.table.find("tr:has(td)").remove();
            for(var i = curr*_this.pageSize; i<res.length && i<_this.pageSize + curr*_this.pageSize ; i++){
                var trdata = res[i];
                var tr = $("<tr></tr>");
                $(trdata).each(function(index){
                    if(index == 0){
                        tr.append('<td>'+(i+1)+'</td>');
                    }
                    tr.append('<td>'+trdata[index]+'</td>');
                });
                _this.table.append(tr);
            }
            _this.setPage();
            _this.tableStyle();
        },
        setPage:function(){
            var _this = this;
                _this.pageCount = Math.ceil(_this.totalSize / _this.pageSize);
            if(!_this.pageUl && _this.pageCount >1){
                _this.createPage();
            }
            if(_this.pageCount >1){
                _this.showPageIndex();
                _this.currPageStyle();
                if(_this.currPage == 0){
                    $("#prev").hide();
                }
            }
        },
        showPageIndex:function(){
            var _this = this;
            _this.pageUl.html('<li class="page-info">当前第' + Number(Number(_this.currPage)+1) +'页，共'+_this.pageCount+'页</li>' +
                '<li id="prev"><a href="#">上一页</a></li>'+
                '<li id="next"><a href="#">下一页</a></li>');
            if(_this.pageCount<8){
                for(var i = 1 ;i <= _this.pageCount;i++){
                    var li = $('<li class="page" data-page="'+(i-1)+'"><a href="#">'+i+'</a></li>');
                    _this.pageUl.find("li:last").before(li);
                }
            }else{
                if(_this.currPage < 4){
                    for(var i = 1 ;i <= 5;i++){
                        var li = $('<li class="page" data-page="'+(i-1)+'"><a href="#">'+i+'</a></li>');
                        _this.pageUl.find("li:last").before(li);
                    }
                    var lis = $('<li>...</li>');
                    _this.pageUl.find("li:last").before(lis);
                    var lastLi = $('<li class="page" data-page="'+( _this.pageCount-1)+'"><a href="#">'+ _this.pageCount+'</a></li>');
                    _this.pageUl.find("li:last").before(lastLi);


                }else if(_this.currPage > _this.pageCount - 4){
                    var firstLi = $('<li class="page" data-page="0"><a href="#">'+1+'</a></li>');
                    _this.pageUl.find("li:last").before(firstLi);

                    var lis = $('<li>...</li>');
                    _this.pageUl.find("li:last").before(lis);

                    for(var i = _this.pageCount -4 ;i <= _this.pageCount;i++){
                        var li = $('<li class="page" data-page="'+(i-1)+'"><a href="#">'+i+'</a></li>');
                        _this.pageUl.find("li:last").before(li);
                    }

                }else{
                    var firstLi = $('<li class="page" data-page="0"><a href="#">'+1+'</a></li>');
                    _this.pageUl.find("li:last").before(firstLi);
                    var lis = $('<li>...</li>');
                    _this.pageUl.find("li:last").before(lis);
                    for(var i = _this.currPage -1 ;i <= Number(_this.currPage) + 2;i++){
                        var li = $('<li class="page" data-page="'+(i-1)+'"><a href="#">'+i+'</a></li>');
                        _this.pageUl.find("li:last").before(li);
                    }
                    var lis = $('<li>...</li>');
                    _this.pageUl.find("li:last").before(lis);
                    var lastLi = $('<li class="page" data-page="'+( _this.pageCount-1)+'"><a href="#">'+ _this.pageCount+'</a></li>');
                    _this.pageUl.find("li:last").before(lastLi);
                }

            }
        },
        currPageStyle:function(){
            var _this = this;
            $(".page").each(function(){
                var the = $(this);
                if(the.attr("data-page") == _this.currPage){
                    the.css({"background-color":"blue"});
                }else{
                    the.css({
                        "background-color":"#fff"
                    });

                }

            });

        },
        createPage:function(){
            var _this = this;
            var  ul = $('<ul id="page-ul"></ul>');
                _this.table.after(ul);
                _this.pageUl = $("#page-ul");
        },
        prevPage:function(){
            var _this = this;
            if(_this.currPage >0){
                _this.currPage --;
                _this.setTableData();
                if(_this.currPage == 0){
                    $("#prev").hide();
                }
            }
            _this.currPageStyle();
        },
        nextPage:function(){
            var _this = this;
            if(_this.currPage < _this.pageCount -1){
                _this.currPage ++;
                _this.setTableData();
                if(_this.currPage == _this.pageCount -1){
                    $("#next").hide();
                }
            }
            _this.currPageStyle();
        },
        skipPage:function(the){
            var _this = this;
                _this.currPage = $(the).attr("data-page");
                _this.setTableData();
                _this.currPageStyle();
            if(_this.currPage == 0){
                $("#prev").hide();
            }
            if(_this.currPage == _this.pageCount -1){
                $("#next").hide();
            }
        }

    };
    table.init();
})();