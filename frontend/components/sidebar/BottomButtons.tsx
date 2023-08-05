import React from 'react';
import { ButtonGroup, Button } from '@mui/material/';
import styled from 'styled-components';
import { selectedColor, textColor, defaultMargin } from '../../style-variables';

const ViewBtnGroup = styled(ButtonGroup)`
  margin: ${defaultMargin} 5px;
  position: fixed;
  bottom: 0px;
  width: 300px;
`;

interface ViewButtonProps {
  $isSelected: boolean;
}

// REVIEW: old code:
// const ViewButton = styled(Button)`
//   background: ${({ $isSelected }: ViewButtonProps) => ($isSelected ? textColor : selectedColor)};
// `;

const ViewButton = styled(Button)<ViewButtonProps>`
  background: ${({ $isSelected }: { $isSelected?: boolean }) =>
    $isSelected ? textColor : selectedColor};
`;

type BottomButtonProps = {
  showCreateDialog: boolean;
  setCreateDialog: (show: boolean) => void;
};

/**
 * Selector for view on sidebar. Updates App state with selected view
 */
function BottomButtons({
  showCreateDialog,
  setCreateDialog,
}: BottomButtonProps) {
  return (
    <ViewBtnGroup variant="contained" fullWidth>
      <ViewButton
        onClick={() => {
          setCreateDialog(true);
        }}
        $isSelected={showCreateDialog}
      >
        Create New Database
      </ViewButton>
    </ViewBtnGroup>
  );
}
export default BottomButtons;
