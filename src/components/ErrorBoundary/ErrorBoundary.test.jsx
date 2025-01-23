import React from "react";
import { render, screen } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";

const ProblematicComponent = () => {
  throw new Error("Something went wrong in the child component!");
};

describe("ErrorBoundary", () => {
  it("renders children without error", () => {
    render(
      <ErrorBoundary>
        <div>Child Component</div>
      </ErrorBoundary>
    );

    expect(screen.getByText("Child Component")).toBeInTheDocument();
  });

  it("catches error and displays fallback UI", () => {
    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText("Something went wrong!")).toBeInTheDocument();

    expect(screen.getByText("Something went wrong in the child component!")).toBeInTheDocument();
    expect(screen.getByText("Details")).toBeInTheDocument();
  });

  it("displays component stack in the details section", () => {
    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );

    const details = screen.getByText("Details").parentElement;
    expect(details).toHaveTextContent("ProblematicComponent");
  });

  it("does not render fallback UI when no error is thrown", () => {
    render(
      <ErrorBoundary>
        <div>Normal Component</div>
      </ErrorBoundary>
    );

    expect(screen.getByText("Normal Component")).toBeInTheDocument();
  });
});
