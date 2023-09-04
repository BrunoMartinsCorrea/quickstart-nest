interface Resources {
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
      "users": "Users"
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
    "logged": {
      "profile": {
        "profile": "Profile"
      }
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
      "id": "ID"
    },
    "deleteDialog": {
      "title_one": "Delete User",
      "title_other": "Delete Users",
      "description_one": "Are you sure you want to delete this user? This action is permanent and cannot be undone.",
      "description_other": "Are you sure you want to delete these users? This action is permanent and cannot be undone."
    }
  }
}

export default Resources;
