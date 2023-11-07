interface Resources {
  "authorization": {
    "title": "Authorization",
    "description": "Configure role groups and user groups",
    "userGroups": {
      "title": "User Groups"
    },
    "roleGroups": {
      "title": "Role Groups"
    },
    "clients": {
      "title": "Clients",
      "schema": {
        "name": "Name",
        "description": "Description",
        "createdAt": "Created at",
        "updatedAt": "Updated at"
      },
      "form": {
        "title": {
          "new": "New client",
          "edit": "Edit client"
        },
        "description": {
          "new": "Fill in the fields below to create a new client",
          "edit": "Edit the fields below to change the client information"
        },
        "fields": {
          "name": {
            "label": "Name",
            "required": "Name is required"
          },
          "description": {
            "label": "Description",
            "required": "Description is required"
          }
        },
        "action": {
          "new": "Create",
          "edit": "Change"
        },
        "result": {
          "success": {
            "title": "Client created",
            "description": "This client can be used now"
          }
        }
      }
    }
  },
  "translation": {
    "errors": {
      "generic": {
        "title": "Oops! something went wrong",
        "description": "Try again, please"
      },
      "network": {
        "title": "No internet access",
        "description": "Please, verify your internet connection"
      },
      "signIn": {
        "title": "Oops! something went wrong",
        "description": "Username or password invalid"
      }
    },
    "actions": {
      "new": "New",
      "toggleAll": "Toggle all",
      "nextPage": "Next page",
      "lastPage": "Last page",
      "previousPage": "Previous page",
      "firstPage": "First page",
      "changeLanguage": "Change language",
      "duplicate": "Duplicate",
      "delete": "Delete",
      "deleteSelected": "Delete selected",
      "edit": "Edit",
      "refresh": "Refresh",
      "cancel": "Cancel",
      "signOut": "Sign Out",
      "asc": "Asc",
      "desc": "Desc",
      "clear": "Clear",
      "apply": "Apply"
    },
    "labels": {
      "pagination": "Page {{page}} of {{totalPages}}",
      "rowsPerPage": "Rows per page",
      "sortBy": "Sort by",
      "toggleVisibility": "Toggle visibility"
    },
    "fields": {
      "email": {
        "label": "Email",
        "required": "Email is required",
        "invalid": "Email is not valid"
      },
      "fullName": {
        "label": "Full name",
        "required": "Name is required"
      },
      "password": {
        "label": "Password",
        "required": "Password is required",
        "min": "Password must have at least {{length}} characters"
      },
      "confirmPassword": {
        "label": "Confirm password",
        "notMatch": "Passwords does not match"
      }
    },
    "menu": {
      "home": "Home",
      "users": "Users",
      "authorization": "Authorization"
    },
    "unlogged": {
      "signIn": {
        "signIn": "Sign In",
        "welcome": "Welcome back. You've been missed!",
        "forgotPassword": "Forgot password"
      },
      "signUp": {
        "signUp": "Sign Up",
        "welcome": "Welcome. Sign up and discover a great amount of new features to scale your business"
      }
    },
    "appearance": {
      "title": "Appearance",
      "description": "Change the platform appearance the way you want",
      "theme": "Theme",
      "roundedBorders": {
        "title": "Rounded borders",
        "values": {
          "none": "0%",
          "small": "25%",
          "medium": "50%",
          "large": "75%",
          "full": "100%"
        }
      },
      "LighDarkMode": {
        "title": "Light/Dark mode",
        "values": {
          "light": "Light",
          "dark": "Dark",
          "inherit": "Follow System"
        }
      },
      "example": {
        "title": "Example",
        "description": "This is a sample text"
      },
      "colors": {
        "gray": "Gray",
        "gold": "Gold",
        "bronze": "Bronze",
        "brown": "Brown",
        "yellow": "Yellow",
        "amber": "Amber",
        "orange": "Orange",
        "tomato": "Tomato",
        "red": "Red",
        "ruby": "Ruby",
        "crimson": "Crimson",
        "pink": "Pink",
        "plum": "Plum",
        "purple": "Purple",
        "violet": "Violet",
        "iris": "Iris",
        "indigo": "Indigo",
        "blue": "Blue",
        "cyan": "Cyan",
        "teal": "Teal",
        "jade": "Jade",
        "green": "Green",
        "grass": "Grass",
        "lime": "Lime",
        "mint": "Mint",
        "sky": "Sky"
      }
    },
    "profile": {
      "title": "Profile"
    }
  },
  "users": {
    "title": "Users",
    "schema": {
      "fullName": "Full name",
      "email": "Email",
      "createdAt": "Created at",
      "updatedAt": "Updated at",
      "username": "Username",
      "password": "Password",
      "id": "ID"
    },
    "deleteDialog": {
      "title_one": "Delete User",
      "title_other": "Delete Users",
      "description_one": "Are you sure you want to delete this user? This action is permanent and cannot be undone.",
      "description_other": "Are you sure you want to delete these users? This action is permanent and cannot be undone."
    },
    "form": {
      "title": {
        "new": "New user",
        "edit": "Edit user"
      },
      "description": {
        "new": "Fill in the fields below to create a new user",
        "edit": "Edit the fields below to change the user settings"
      },
      "fields": {
        "email": {
          "label": "Email",
          "required": "Email is required",
          "invalid": "Email is not valid"
        },
        "fullName": {
          "label": "Full name",
          "required": "Name is required"
        },
        "password": {
          "label": "Password",
          "required": "Password is required",
          "min": "Password must have at least {{length}} characters"
        },
        "confirmPassword": {
          "label": "Confirm password",
          "notMatch": "Passwords does not match"
        }
      },
      "action": {
        "new": "Create",
        "edit": "Change"
      },
      "result": {
        "success": {
          "title": "User created",
          "description": "This new user can be used to log in now"
        }
      }
    }
  }
}

export default Resources;
