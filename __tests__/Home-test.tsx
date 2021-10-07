import React from "react";
import { render, RenderAPI, fireEvent, act, waitFor } from '@testing-library/react-native';
import { HomeScreen } from '../src/screens/HomeScreen';

let component:RenderAPI;

describe("<HomeScreen />", () => {
  //To set clean instances to all components
  beforeEach(() => {
    component = render(<HomeScreen />);
  });

  //First test case
  it("Render correctly", () => {
    expect(component).toBeDefined();
    //Render this item to initial value for the component
    expect(component.getByTestId("text-data-empty")).toBeDefined();
    //When particular element does not exist in the initial render
    expect(component.queryAllByTestId("image-ouput").length).toEqual(0);
  });

  //Second
  it("Render result image correctly after onPress action button", () => {
    const button = component.getByTestId("action-button");
    act(() => {
      fireEvent(button, "press");
    });
    //To do the matcher
    waitFor(() => expect(component.getByTestId("image-ouput")).toBeDefined());
  });

  //Third
  it("TexInput should have a string value when onPress action button has been pressed", () => {

    const button = component.getByTestId("action-button");
    const input = component.getByTestId("text-data-input");
    
    act(() => {
      fireEvent(button, "press");
      fireEvent.changeText(input, { nativeEvent: { text: '' } });
    });;

    waitFor(() => expect(input.props.value).toBe(typeof ''));
    
  })



});