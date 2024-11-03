import React, { useState } from "react";
import { Card } from "./components/Card/Card";
import { Dialog } from "./components/Dialog/Dialog";
import "./styles/App.scss";

const App: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  return (
    <div className="app">
      <Card openDialog={openDialog} />
      {isDialogOpen && <Dialog closeDialog={() => setIsDialogOpen(false)} />}
    </div>
  );
};

export default App;
