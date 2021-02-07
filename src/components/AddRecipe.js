import React from 'react';
import jsx from 'react-jsx';

export class AddRecipe extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var recipeAddedName = this.props.recipe;
    var displayMessage = recipeAddedName.length > 0 ? `Recipe "${recipeAddedName}" added!` : '';

    return (
      <div>{displayMessage}</div>
    )
  }
}