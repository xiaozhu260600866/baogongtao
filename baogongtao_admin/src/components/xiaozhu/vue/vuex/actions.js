import * as types from './types'
import mutations from './mutations'

export default {
    ajax: ({ /* 异步加载*/
        commit
    }, formAction) => {
        mutations.state.hasMore = '不显示'
         $('.loadmore').remove()

        mutations.state.listData = []
        localStorage.setItem('formAction', formAction)
        if (formAction == localStorage.getItem('formAction')) {
            $.ajax({
                url: formAction,
                type: 'get',
                dataType: 'json',
                success: function(msg) {
                    commit(types.AJAX, msg)
                }
            })
        }
    },
    loadMore: ({ /* 下拉加载*/
        commit
    }, data) => {
        var state = mutations.state

        if (data.formAction == localStorage.getItem('formAction')) {
            if (state.lastPage != 1) {
                setTimeout(function() {
                    if (state.busy) return
                    mutations.state.hasMore = '正在加载'
                    mutations.state.busy = true
                    var thisPage = state.thisPage
                    var formAction = data.formAction
                    var lastPage = state.lastPage
                    var nextPage = thisPage + 1
                    var formAction = formatPageUrl(nextPage, formAction)
                    if (lastPage >= nextPage) { // 如果还有下一页
                        setTimeout(function() {
                            $.ajax({
                                url: formAction,
                                type: 'get',
                                dataType: 'json',
                                data: {},
                                success: function(msg) {
                                    commit(types.LOADMORE, msg, data.busy)
                                }
                            })
                        }, 300)
                    } else {}
                }, 1000)
            }
        }
    },
    changeStatus: ({ /* 异步加载(改变状态)*/
        commit
    }, data) => {
        var formAction = data.formAction
        var status = data.status
        mutations.state.formAction = formatUrl(formAction, 'status', status)
        mutations.state.status = status
        showLoading_vue()
        $.ajax({
            url: mutations.state.formAction,
            type: 'get',
            dataType: 'json',
            success: function(msg) {
                hideLoading_vue()
                commit(types.CHANGESTATUS, msg)
            }
        })
    }

}
