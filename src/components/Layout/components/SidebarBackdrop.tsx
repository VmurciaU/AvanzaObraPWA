interface SidebarBackdropProps {
  isSidebarOpen: boolean;
}

const SidebarBackdrop: React.FC<SidebarBackdropProps> = ({ isSidebarOpen }) => {
  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black bg-opacity-20 lg:hidden"
          style={{
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
          }}
        ></div>
      )}
    </>
  );
};

export { SidebarBackdrop };
