import { renderCatalog } from './components/catalog.js';
import { renderSetup } from './components/setup.js';
import { renderQuestions } from './components/question.js';
import { renderResults } from './components/results.js';

let state = { screen: 'catalog', instrumentId: null, setup: null };

function navigate(screen, data = {}) {
  state = { ...state, screen, ...data };
  render();
}

function render() {
  switch (state.screen) {
    case 'catalog':
      renderCatalog((id) => navigate('setup', { instrumentId: id }));
      break;
    case 'setup':
      renderSetup((setup) => navigate('questions', { setup }));
      break;
    case 'questions':
      renderQuestions(state.setup, (responses, impactResponses, versionKey) => {
        navigate('results', { responses, impactResponses, versionKey });
      });
      break;
    case 'results':
      renderResults(state.setup, state.responses, state.impactResponses, state.versionKey, () => {
        navigate('catalog');
      });
      break;
  }
}

// Start
render();
