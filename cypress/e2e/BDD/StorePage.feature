@defaultCommandTimeout(10000)
Feature: StorePage Test cases
    As user I want to add item to the cart

    @Smoke
    @Regression
    Scenario: "Add Items to the cart: Nokia Edge, Samsung Note 8"
        Given I go to the Store Login StorePage
        When I login to the app
        And I should see the app homepage
        And I add items to the cart: Nokia Edge, Samsung Note 8
        And I validate the total price of the items and checkout
        And I choose India contry and submit
        Then I should see the Alert message that confirm the order

    @Smoke
    Scenario: "Add Items to the cart: iphone X, Blackberry"
        Given I go to the Store Login StorePage
        When I login to the app
        And I should see the app homepage
        And I add items to the cart: iphone X, Blackberry
        And I validate the total price of the items and checkout
        And I choose India contry and submit
        Then I should see the Alert message that confirm the order

    @datatable
    Scenario: "Add Items to the cart with Credentials Data Table"
        Given I go to the Store Login StorePage
        When I login to the app with the following credentials
            | username           | password |
            | rahulshettyacademy | learning |
        And I should see the app homepage
        And I add items to the cart: iphone X, Blackberry
        And I validate the total price of the items and checkout
        And I choose India contry and submit
        Then I should see the Alert message that confirm the order

    @Smoke
    @Regression
    Scenario: "Add Items to the cart with several Devices on Data Table"
        Given I go to the Store Login StorePage
        When I login to the app with the following credentials
            | username           | password |
            | rahulshettyacademy | learning |
        And I should see the app homepage
        And I add the following devices to the cart
            | deviceName |
            | iphone X   |
            | Blackberry |
        And I validate the total price of the items and checkout
        And I choose India contry and submit
        Then I should see the Alert message that confirm the order