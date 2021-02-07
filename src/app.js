import React from 'react';
import jsx from 'react-jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      recipeName: '',
      recipeLink: ''};
  }

  handleChangeUserName(event) {
    console.log('handleChangeUserName event: ', event.target.value);
    this.setState({userName: event.target.value});
  }

  handleChangeRecipeName(event) {
    console.log('handleChangeRecipeName event: ', event.target.value);
    this.setState({recipeName: event.target.value});
  }

  handleChangeRecipeUrl(event) {
    console.log('handleChangeRecipeUrl event: ', event.target.value);
    this.setState({recipeLink: event.target.value});
  }

  handleAddRecipe(event) {
    // var userName_submit = $('.input-name').val();
    // var recipeName = $('.input-recipe-name').val().toString();
    // var recipeURL = $('.input-recipe').val().toString();
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
        $('body').html(results);
      },
      error: (error) => {
        console.log('Error in POST response!: ', error);
      }
    })
  }

  handleGetRecipes(event) {
    event.preventDefault();
    // event.stopPropogation();
    // var userName_retrieve = $('.input-name').val();
    var userName_retrieve = this.state.userName;

    $.ajax({
      url: "http://localhost:5500/retrieve",
      type: "GET",
      data: {
        user: userName_retrieve
      },
      contentType: "application/json",
      success: (results) => {
        $('body').html(results);
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
          <label>
            Recipe Name:
            <input type="text" value={this.state.recipeName} onChange={this.handleChangeRecipeName}/>
          </label>
          <input type="submit" value="Add a Recipe"/>
          <label>
            Recipe Link:
            <input type="text" value={this.state.recipeLink} onChange={this.handleChangeRecipeUrl}/>
          </label>
          <input type="submit" value="Get all recipes for username"/>
        </form>
      </div>
    )
  }
}

export default App;