import m from 'mithril';
import { specialRules, weapons } from './data';
import { pointsCostText } from './utilities';
import Unit from './components/Unit';

const root = document.body;

const units = [];

const DEFAULT_UNIT = {
  name: 'New Unit',
  weapons: [weapons.knife],
  rules: [],
};

const updateUnit = (idx, newUnit) => {
  units[idx] = { ...newUnit };
};

const removeUnit = (idx) => units.splice(idx, 1);

const itemsCostReducer = (costOfItems, item) => costOfItems + item.cost;

const calculateTotalCost = () =>
  units.reduce((costOfUnits, unit) => {
    return (
      costOfUnits +
      unit.weapons.reduce(itemsCostReducer, 0) +
      unit.rules.reduce(itemsCostReducer, 0)
    );
  }, 0);

const App = {
  view: () => {
    const totalCost = calculateTotalCost();

    return m('main', [
      m('header.app-title', [
        m('h1.title', 'Double Tap'),
        m('h2.subtitle', 'Army Builder'),
      ]),
      m('.army-summary', [
        m(
          'span.unit-count',
          `${units.length} ${units.length === 1 ? 'unit' : 'units'}`,
        ),
        m('span.total-cost', `${totalCost}${pointsCostText(totalCost)}`),
      ]),
      units.length === 0
        ? m('.empty-unit-list', 'No units! Add a unit to get started.')
        : m(
            'ul.unit-list',
            units.map((unit, index) =>
              m('li', m(Unit, { unit, index, updateUnit, removeUnit })),
            ),
          ),
      m(
        'button.button.button--full-width',
        { type: 'button', onclick: () => units.push({ ...DEFAULT_UNIT }) },
        'Add unit',
      ),
    ]);
  },
};

m.mount(root, App);
