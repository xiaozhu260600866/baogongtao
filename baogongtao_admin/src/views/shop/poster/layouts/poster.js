export default {
	data: {
		'listsAction': '',
		'pageSize': 15,
		'canCreate': 1,
		'canEdit': 1,
		'tableName': 'shop_posters',
		'createAction': '/admin/shop/poster/create',
		'editAction': '/admin/shop/poster/edit',
		'checkAll': true,
		'searchFields': [{
			'name': '',
			'prop': 'name',
			'type': 'text',
			'label': '名称'
		}],
		'tarbars': {
			'prop': 'type',
			'data': [{
				'name': '',
				'value': '1',
				'count': 0,
				'label': '首页幻灯片'
			},  {
				'name': '',
				'value': '3',
				'count': 0,
				'label': '首页导航'
			}]
		},
		'tableFields': [{
			'name': '',
			'prop': 'sort',
			'minWidth': '',
			'width': '80',
			'align': 'center',
			'append_table_': 0,
			'label': '排序'
		}, {
			'name': '',
			'prop': 'name',
			'minWidth': '',
			'width': '200',
			'append_table_': 0,
			'label': '名称'
		},
     { 'prop': 'is_index', 'minWidth': '', 'width': '90', 'align': 'center', 'type': 'editField', 'url': '/admin/shop/poster/editField', 'append_table_': 0, 'label': '显示/隐藏' },

    {
			'name': '',
			'prop': 'url',
			'minWidth': '180',
			'width': '',
			'append_table_': 0,
			'label': 'url地址'
		}, {
			'name': '',
			'prop': 'created_at',
			'minWidth': '',
			'width': '180',
			'append_table_': 0,
			'label': '编辑时间'
		}],
		'formFields': [{
			'name': '',
			'prop': 'name',
			'datatype': 'require',
			'type': 'text',
			'append_form_': 0,
			'label': '名称'
		}, {
			'name': '',
			'prop': 'url',
			'datatype': 'require',
			'type': 'text',
			'append_form_': 0,
			'label': 'url地址'
		}, {
			'name': '',
			'prop': 'sort',
			'datatype': 'require|integer',
			'type': 'text',
			'append_form_': 0,
			'label': '排序'
		}, {
			'name': '',
			'prop': 'pic',
			'datatype': 'array',
			'type': 'upload',
			'append_form_': 0,
			'label': '图片',
			'allowUpLoadNum': '1',
			'upurl': 'poster'
		}]
	}
}
