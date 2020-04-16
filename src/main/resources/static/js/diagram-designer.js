$(function () {

});

var vm = new Vue({
	el:'#rrapp',
	data:{
		q:{
			tableName: null
		}
	},
	methods: {
		query: function () {
			$("#jqGrid").jqGrid('setGridParam',{ 
                postData:{'tableName': vm.q.tableName},
                page:1 
            }).trigger("reloadGrid");
		},
		generator: function() {
            var tableNames = getSelectedRows();
            if(tableNames == null){
                return ;
            }
            location.href = "sys/generator/code?tables=" + tableNames.join();
		}
	}
});

