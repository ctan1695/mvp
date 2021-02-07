import React from 'react';
import jsx from 'react-jsx';
import $ from 'jquery';
import {RecipeResults} from './components/RecipeResults';
import {AddRecipe} from './components/AddRecipe';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      recipeName: '',
      recipeLink: '',
      recipeResults: [],
      recipeAdded: ''
    };

    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleChangeRecipeName = this.handleChangeRecipeName.bind(this);
    this.handleChangeRecipeUrl = this.handleChangeRecipeUrl.bind(this);
    this.handleAddRecipe = this.handleAddRecipe.bind(this);
    this.handleGetRecipes = this.handleGetRecipes.bind(this);

  }

  handleChangeUserName(event) {
    this.setState({userName: event.target.value});
  }

  handleChangeRecipeName(event) {
    this.setState({recipeName: event.target.value});
  }

  handleChangeRecipeUrl(event) {
    this.setState({recipeLink: event.target.value});
  }

  handleAddRecipe(event) {
    var userName_submit = this.state.userName;
    var recipeName = this.state.recipeName;
    var recipeURL = this.state.recipeLink;

    event.preventDefault();

    $.ajax({
      url: "http://localhost:5500/submit",
      type: "POST",
      data: {
        user: userName_submit,
        recipe_name: recipeName,
        recipe: recipeURL
      },
      dataType: "text",
      success: (results) => {
        this.setState({recipeAdded: recipeName});
      },
      error: (error) => {
        console.log('Error in POST response!: ', error);
      }
    })
  }

  handleGetRecipes(event) {
    event.preventDefault();
    var userName_retrieve = this.state.userName;
    $.ajax({
      url: "http://localhost:5500/retrieve",
      type: "GET",
      data: {
        user: userName_retrieve
      },
      contentType: "application/json",
      success: (results) => {
        this.setState({recipeResults: results});
      },
      error: (error) => {
        console.log('Error in GET response!: ', error);
      }
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleGetRecipes}>
          <label>
            Username:
            <input type="text" value={this.state.userName} onChange={this.handleChangeUserName}/>
          </label>
          <input type="submit" value="Get all recipes for username"/>
        </form>
        <form onSubmit={this.handleAddRecipe}>
          <label>
              Recipe Name:
              <input type="text" value={this.state.recipeName} onChange={this.handleChangeRecipeName}/>
            </label>
            <input type="submit" value="Add a Recipe"/>
            <label>
              Recipe Link:
              <input type="text" value={this.state.recipeLink} onChange={this.handleChangeRecipeUrl}/>
            </label>
        </form>
      <RecipeResults recipes={this.state.recipeResults} />
      <AddRecipe recipe={this.state.recipeAdded} />
      </div>
    )
  }
}

export default App;