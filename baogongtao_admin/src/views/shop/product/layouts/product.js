export default {
    data: {
        'listsAction': '',
        'pageSize': 15,
        'canCreate': 1,
        'canEdit': 1,
        'tableName': 'products',
        'editAction': '/admin/shop/product/edit',
        classAction: '/admin/shop/product/',
		"createAction":'/admin/shop/product/create',
        //auditAction: '/admin/shop/product/changeStatus',
        'checkAll': true,
        'searchFields': [
            {
            'name': '',
            'prop': 'name',
            'type': 'text',
            'label': '产品名称'
            },
            {
            'name': '',
            'prop': 'merchant_name',
            'type': 'text',
            'label': '商家名称'
            },
            {
            'prop': 'fclass',
            'type': 'manyselect',
            'datakey': 'fclass',
            'label': '分类'
            }
        ],
       // 'tarbars': {
       //     'prop': 'status',
       //     'data': [{
       //         'value': '0',
       //         'count': 0,
       //         'label': '审核中'
       //     }]
       // },
        'tableFields': [
            { 'prop': 'id', 'minWidth': '', 'width': '80', 'align': 'center', 'append_table_': 0, 'label': '编号' },
            { 'prop': 'cover', 'minWidth': '', 'width': '60', 'append_table_cover': 1, 'label': '图片' },
            { 'prop': 'name', 'minWidth': '180', 'width': '', 'append_table_': 0, 'label': '产品名称' },
            { 'prop': 'fclassname', 'minWidth': '', 'width': '100', 'append_table_': 0, 'label': '分类' },
            { 'prop': 'getCompany.name', 'minWidth': '', 'width': '120', 'append_table_': 0, 'label': '企业名称' },
            { 'prop': 'price', 'minWidth': '', 'width': '100', 'align': 'center', 'append_table_': 0, 'label': '单价' },
            // { 'prop': 'specs', 'minWidth': '', 'width': '60', 'align': 'center', 'append_table_': 0, 'label': '规格' },
            { 'prop': 'num', 'minWidth': '', 'width': '60', 'align': 'center', 'append_table_': 0, 'label': '库存' },
            // { 'prop': '', 'minWidth': '', 'width': '60', 'align': 'center', 'append_table_': 0, 'label': '销量' },
            // { 'prop': '', 'minWidth': '', 'width': '100', 'align': 'center', 'append_table_': 0, 'label': '状态' },
            // { 'prop': 'is_index', 'minWidth': '', 'width': '100', 'align': 'center', 'type': 'editField', 'url': '/admin/merchant/product/editField', 'label': '今天特价' },
            // { 'prop': 'category', 'minWidth': '', 'width': '100', 'align': 'center', 'datakey': 'productCategory', 'type': 'select', 'url': '/admin/merchant/product/editField', 'label': '专属人群' },
            { 'prop': 'shell_date', 'minWidth': '', 'width': '100', 'append_table_': 0, 'label': '售卖日期' },
            { 'prop': 'created_at', 'minWidth': '', 'width': '100', 'append_table_': 0, 'label': '发布日期' }
        ],
        'formFields': [
            { 'prop': 'name', 'datatype': 'require', 'type': 'text', 'append_form_': 0, 'label': '产品名称' },
            { 'prop': 'class_value', 'datatype': 'require', datakey: 'fclass', 'type': 'manyselect', 'append_form_': 0, 'label': '分类' },
            { prop: 'company_id', 'datatype': 'require', name: 'company_name', rowName: 'name', label: '选择企业', type: 'searchRadio', url: '/admin/shop/product/searchCompany?status=1&type=search', tableFields: [
               { prop: 'name', label: '企业名称', width: '200' },
               { prop: 'phone', label: '企业电话', width: '200' }
               ], searchFields: [
                    { prop: 'name', label: '企业名称' }
               ] },
           { 'prop': 'price', 'datatype': 'require', 'type': 'text', 'append_form_': 0, 'label': '单价' },

           { 'prop': 'num', 'datatype': 'require', 'type': 'text', 'append_form_': 0, 'label': '库存' },


        
           { 'prop': 'cover', allowUpLoadNum: 5, upurl: 'product', 'type': 'upload', 'append_form_': 0, 'label': '图片' },
           { 'prop': 'content', 'datatype': 'require', 'type': 'editor', 'append_form_': 0, 'label': '' }
        // {
        //     "prop": "pic",
        //     "datatype": "array",
        //     "type": "upload",
        //     "append_form_": 0,
        //     "label": "pic",
        //     "allowUpLoadNum": "1",
        //     "upurl": "coupon"
        // },
        ]
    }
}
