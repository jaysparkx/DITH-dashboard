import React, { createContext, useContext, useState } from 'react';

interface SidebarContextType {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  collapseSidebar: () => void;
  expandSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

interface SidebarProviderProps {
  children: React.ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    try {
      setIsCollapsed(prev => !prev);
    } catch (error) {
      console.warn('Sidebar toggle error:', error);
    }
  };

  const collapseSidebar = () => {
    try {
      setIsCollapsed(true);
    } catch (error) {
      console.warn('Sidebar collapse error:', error);
    }
  };

  const expandSidebar = () => {
    try {
      setIsCollapsed(false);
    } catch (error) {
      console.warn('Sidebar expand error:', error);
    }
  };

  const value = {
    isCollapsed: isCollapsed ?? false,
    toggleSidebar,
    collapseSidebar,
    expandSidebar,
  };

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
};