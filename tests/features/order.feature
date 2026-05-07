@smoke @ui
Feature: UI Order Flow

  @regression
  Scenario: User logs in and adds product to cart
    Given user is logged in
    When user adds product to cart
    Then cart should contain product

  Scenario: User is lockde out
    Given user is loging i with locked out credentials
    Then user should see lockout message