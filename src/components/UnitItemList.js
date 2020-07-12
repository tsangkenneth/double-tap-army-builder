import m from 'mithril'

export default {
  view: ({ attrs: { items } }) => {
    return items.length === 0
      ? m('.empty-unit-item-list', 'None')
      : m('ul.unit-item-list', [
        items.map((item, index) => m('li.unit-item', [
          m('span.unit-item__name', item.name),
          m('span.unit-item__cost', item.cost),
          m('button', { type: 'button', onclick: () => items.splice(index, 1)}, 'X')
        ]))
    ])
  }
}
