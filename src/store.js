import { createStore  } from 'vuex';

const store = createStore({
    state: {
        name: 'A',
        children: [
            { name: 'A1-1' },
            { name: 'A1-2' },
            {
                name: 'A1-3',
                children: [
                    {
                        name: 'A13-1',
                        children: [{ name: 'A131-1' }, { name: 'A131-2' }]
                    },
                    { name: 'A13-2' },
                    { name: 'A13-3' },
                    {
                        name: 'A13-4',
                        children: [{ name: 'A134-1' }, { name: 'A134-2' }]
                    }
                ]
            }
        ]
    },
    mutations: {
        CHANGE_NAME: (state, payload) => {
            const newState = JSON.parse(
                JSON.stringify(state),
                (key, itemName) => key === 'name' && itemName === payload.item.name ? payload.newName : itemName
            );

            state.name = newState.name;
            state.children = newState.children;
        },
        ADD_NEW_CHILD: (state, payload) => {
            let newChildren;

            if (payload.item.children === undefined) {
              newChildren = {
                ...payload.item,
                  children: []
              };
            } else {
              newChildren = {...payload.item};
            }

            newChildren = {
              ...newChildren,
              children: [
                ...newChildren.children,
                {
                  name: payload.newName,
                  children: []
                }
              ]
            };

            getProp(state);

            function getProp(obj) {
                for (var prop in obj) {
                    if (typeof (obj[prop]) === 'object') {
                        getProp(obj[prop]);
                    } else {
                        if (obj[prop] === payload.item.name) {
                            obj.children = newChildren.children;
                        }
                    }
                }
            }
        },
        REMOVE: (state, payload) => {
            getProp(state);

            function getProp(obj) {
                for (var prop in obj) {
                    if (typeof (obj[prop]) === 'object') {
                        getProp(obj[prop]);
                    } else {
                        if (obj[prop] === payload.name) {
                            obj.name = '';
                            obj.children = [];
                        }
                    }
                }
            }
        },
    },
    actions: {
        CHANGE_NAME({commit}, payload) {
            commit('CHANGE_NAME', payload);
        },
        ADD_NEW_CHILD({commit}, payload) {
            commit('ADD_NEW_CHILD', payload);
        },
        REMOVE({commit}, payload) {
            commit('REMOVE', payload);
        }
    },
    getters: {
        TREE: state => {
            return state;
        },
        NAME: state => {
            return state.name;
        },
        CHILDREN: state => {
            return state?.children;
        }
    },
    modules: {}
});

export default store;

