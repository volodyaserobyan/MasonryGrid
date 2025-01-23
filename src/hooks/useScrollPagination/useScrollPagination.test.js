import { render, act } from '@testing-library/react';
import { useState } from 'react';
import useScrollPagination from './useScrollPagination';
import React from 'react';

describe('useScrollPagination', () => {
    it('should initialize correctly and set up scroll listener', () => {
        const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    
        const TestComponent = () => {
          const [isLoading, setIsLoading] = useState(false);
          const [hasNextPage, setHasNextPage] = useState(true);
          const onScrollCallback = jest.fn();
          useScrollPagination(isLoading, hasNextPage, onScrollCallback);
          return <div>Test Component</div>;
        };
    
        render(<TestComponent />);
        expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
        addEventListenerSpy.mockRestore();
      });

  it('should trigger onScrollCallback when sentinel is in view', () => {
    const onScrollCallback = jest.fn();
    const TestComponent = () => {
      const [isLoading, setIsLoading] = useState(false);
      const [hasNextPage, setHasNextPage] = useState(true);
      
      const sentinelRef = useScrollPagination(isLoading, hasNextPage, onScrollCallback);
      
      return (
        <div>
          <div style={{ height: '2000px' }} />
          <div ref={sentinelRef} style={{ height: '50px', backgroundColor: 'red' }} />
        </div>
      );
    };

    const { container } = render(<TestComponent />);
    
    const sentinelElement = container.querySelector('div[style="height: 50px; background-color: red;"]');
    
    Object.defineProperty(sentinelElement, 'getBoundingClientRect', {
      value: jest.fn(() => ({
        top: 500,
        left: 0,
        width: 50,
        height: 50,
      })),
    });
    
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });

    expect(onScrollCallback).toHaveBeenCalled();
  });

  it('should not trigger onScrollCallback when isLoading is true', () => {
    const onScrollCallback = jest.fn();
    const TestComponent = () => {
      const [isLoading, setIsLoading] = useState(true);
      const [hasNextPage, setHasNextPage] = useState(true);
      
      const sentinelRef = useScrollPagination(isLoading, hasNextPage, onScrollCallback);
      
      return (
        <div>
          <div style={{ height: '2000px' }} />
          <div ref={sentinelRef} style={{ height: '50px', backgroundColor: 'red' }} />
        </div>
      );
    };

    const { container } = render(<TestComponent />);
    
    const sentinelElement = container.querySelector('div[style="height: 50px; background-color: red;"]');
    Object.defineProperty(sentinelElement, 'getBoundingClientRect', {
      value: jest.fn(() => ({
        top: 500,
        left: 0,
        width: 50,
        height: 50,
      })),
    });
    
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });

    expect(onScrollCallback).not.toHaveBeenCalled();
  });

  it('should not trigger onScrollCallback when hasNextPage is false', () => {
    const onScrollCallback = jest.fn();
    const TestComponent = () => {
      const [isLoading, setIsLoading] = useState(false);
      const [hasNextPage, setHasNextPage] = useState(false);
      
      const sentinelRef = useScrollPagination(isLoading, hasNextPage, onScrollCallback);
      
      return (
        <div>
          <div style={{ height: '2000px' }} />
          <div ref={sentinelRef} style={{ height: '50px', backgroundColor: 'red' }} />
        </div>
      );
    };

    const { container } = render(<TestComponent />);
    
    const sentinelElement = container.querySelector('div[style="height: 50px; background-color: red;"]');
    Object.defineProperty(sentinelElement, 'getBoundingClientRect', {
      value: jest.fn(() => ({
        top: 500,
        left: 0,
        width: 50,
        height: 50,
      })),
    });
    
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });

    expect(onScrollCallback).not.toHaveBeenCalled();
  });
  it('should clean up the scroll event listener on unmount', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    const TestComponent = () => {
      const [isLoading, setIsLoading] = useState(false);
      const [hasNextPage, setHasNextPage] = useState(true);
      const onScrollCallback = jest.fn();
      
      useScrollPagination(isLoading, hasNextPage, onScrollCallback);
      
      return <div>Test Component</div>;
    };

    const { unmount } = render(<TestComponent />);
    
    expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));

    unmount();
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });
});
