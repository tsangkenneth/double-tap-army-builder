import m from 'mithril'
import UnitItemList from './UnitItemList'
import { specialRules, weapons } from '../data'
import { pointsCostText } from '../utilities'

function calculateCost(unit, type) {
  return unit[type].reduce((cost, item) => cost + item.cost, 0)
}

export default {
  view: ({ attrs: { unit, index, updateUnit, removeUnit } }) => {
    const weaponsCost = calculateCost(unit, 'weapons');
    const rulesCost = calculateCost(unit, 'rules');
    const unitCost = weaponsCost + rulesCost;

    return m('.unit', [
      m('.unit-summary', [
        m('input.unit-summary__name[type="text"]', {
          value: unit.name,
          oninput: e => updateUnit(index, { ...unit, name: e.target.value })
        }),
        m('span.unit-summary__cost', `${unitCost}${pointsCostText(unitCost)}`),
        m('button', { type: 'button', onclick: () => removeUnit(index)}, 'X')
      ]),
      m('.unit-items', [
        m('div.unit-items-title', `Weapons (${weaponsCost}${pointsCostText(weaponsCost)})`),
        m(UnitItemList, { items: unit.weapons })
      ]),
      m('.unit-items', [
        m('div.unit-items-title', `Special rules (${rulesCost}${pointsCostText(rulesCost)})`),
        m(UnitItemList, { items: unit.rules })
      ]),
      m('label.add-unit-item', [
        m('span.add-unit-item__text', 'Add a weapon:'),
        m('select', {
          oninput: e => updateUnit(index, { ...unit, weapons: [...unit.weapons, weapons[e.target.value]]})
        }, [
          Object.keys(weapons).map(weapon => m('option', { value: weapon }, weapons[weapon].name))
        ])
      ]),
      m('label.add-unit-item', [
        m('span.add-unit-item__text', 'Add a rule:'),
        m('select', {
          oninput: e => updateUnit(index, { ...unit, rules: [...unit.rules, specialRules[e.target.value]]})
        }, [
          Object.keys(specialRules).map(rule => m('option', { value: rule }, specialRules[rule].name))
        ])
      ])
    ])
  }
}
