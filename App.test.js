import React from 'react';
import App from './App';
import ButtonResponse from './components/layout/ButtonResponse'
import renderer from 'react-test-renderer';
import { dummyData } from './utils/helpers'
//Quiz

test('Testando integridade da junção de estilos', () => {
  const component = renderer.create(
    <ButtonResponse btnStyle={{ marginTop: 99 }} />
  );
  let tree = component.toJSON();

  const react_native = tree.props.style
  const manual = ({
    ...tree.props.style,
    ...tree.props.btnStyle
  })

  expect(JSON.stringify(react_native) == JSON.stringify(manual)).toBe(true)

});



// test('Testando quiz', () => {
//   const { title, questions } = dummyData['Teologia']
//   const component = renderer.create(
//     <Quiz etstendo={'oioioi'} navigation={{ state: { params: { title, questions } } }} />
//   );

//   const quiz = component.toJSON();
//   console.log(quiz)
//   console.log("\n\n\nxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n\n\n")
//   console.log(quiz.propss)
  
//   // expect(JSON.stringify(tree.props.state.params.title) == JSON.stringify(manual)).toBe(true)
//   expect(quiz.props.navigation.state.params.title== title).toBe(true)

// });



