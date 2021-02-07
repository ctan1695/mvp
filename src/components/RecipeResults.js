import React from 'react';
import jsx from 'react-jsx';

export class RecipeResults extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var recipeList = [];

    for (var i = 0; i < this.props.recipes.length; i++) {
      recipeList.push(
      <li>
        <a href={this.props.recipes[i].RECIPE_URL}>
          {this.props.recipes[i].RECIPE_NAME}
        </a>
      </li>);
    }

    return (
      <div>{recipeList}</div>
    )
  }
}
