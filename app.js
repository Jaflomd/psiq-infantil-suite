import { renderCatalog } from './components/catalog.js';
import { renderSetup } from './components/setup.js';
import { renderQuestions } from './components/question.js';
import { renderResults } from './components/results.js';
import { renderMCHATQuestions } from './components/mchat-questions.js';
import { renderMCHATResults } from './components/mchat-results.js';

let state = { screen: 'catalog', instrumentId: null, setup: null };

function navigate(screen, data = {}) {
  state = { ...state, screen, ...data };
  render();
}

function render() {
  switch (state.screen) {
    case 'catalog':
      renderCatalog((id) => {
        if (id === 'mchat') {
          navigate('mchat-questions', { instrumentId: id });
        } else {
          navigate('setup', { instrumentId: id });
        }
      });
      break;
    case 'setup':
      renderSetup(
        (setup) => navigate('questions', { setup }),
        () => navigate('catalog')
      );
      break;
    case 'questions':
      renderQuestions(
        state.setup,
        (responses, impactResponses, versionKey) => {
          navigate('results', { responses, impactResponses, versionKey });
        },
        () => navigate('setup', { instrumentId: state.instrumentId })
      );
      break;
    case 'results':
      renderResults(state.setup, state.responses, state.impactResponses, state.versionKey, () => {
        navigate('catalog');
      });
      break;
    case 'mchat-questions':
      renderMCHATQuestions(
        (responses) => navigate('mchat-results', { responses }),
        () => navigate('catalog')
      );
      break;
    case 'mchat-results':
      renderMCHATResults(state.responses, () => navigate('catalog'));
      break;
  }
}

render();
