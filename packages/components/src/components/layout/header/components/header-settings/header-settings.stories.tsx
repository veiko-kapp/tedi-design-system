import { Meta, StoryObj } from '@storybook/react';

import { useLayout } from '../../../../../helpers/hooks/use-layout';
import Anchor from '../../../../anchor/anchor';
import { Card, CardContent } from '../../../../card';
import Separator from '../../../../separator/separator';
import VerticalSpacing from '../../../../vertical-spacing/vertical-spacing';
import HeaderRole, { HeaderRoleProps } from '../header-role/header-role';
import { WithSecondaryInfo as HeaderRoleDefault } from '../header-role/header-role.stories';
import HeaderSettings from './header-settings';

const meta: Meta<typeof HeaderSettings> = {
  component: HeaderSettings,
};

export default meta;
type Story = StoryObj<typeof HeaderSettings>;

const DefaultContent = ({ onToggle }: { onToggle?: (open: boolean) => void }) => {
  const isMobile = useLayout(['mobile']);
  const renderAnchor = (label: string) => (
    <Anchor href="#" onClick={() => onToggle?.(false)}>
      {label}
    </Anchor>
  );

  return (
    <VerticalSpacing>
      {isMobile && (
        <>
          {renderAnchor('Custom Content')}
          <Separator fullWidth />
        </>
      )}
      {renderAnchor('Minu andmed')}
      <Separator fullWidth />
      {renderAnchor('Ligipääs andmetele')}
      <Separator fullWidth />
      {renderAnchor('Tahteavaldused')}
      <Separator fullWidth />
      {renderAnchor('Volitatud isikud')}
      <Separator fullWidth />
      {renderAnchor('Kontaktisikud')}
    </VerticalSpacing>
  );
};

const ModalContent = ({ onToggle }: { onToggle?: (open: boolean) => void }) => (
  <>
    <HeaderRole
      {...(HeaderRoleDefault.args as HeaderRoleProps)}
      label={`${HeaderRoleDefault.args?.label}:`}
      renderModal={true}
    />
    <Card border="top-info-main">
      <CardContent>
        <DefaultContent onToggle={onToggle} />
      </CardContent>
    </Card>
  </>
);

const Content = ({ onToggle }: { onToggle?: (open: boolean) => void }) => {
  const isMobileTablet = useLayout(['mobile', 'tablet']);

  return isMobileTablet ? <ModalContent onToggle={onToggle} /> : <DefaultContent onToggle={onToggle} />;
};

export const Default: Story = {
  args: {
    children: ({ onToggle }) => <Content onToggle={onToggle} />,
    onActionClick: () => console.log('Logout'),
  },
};

export const OnlyLogout: Story = {
  args: {
    onActionClick: () => console.log('Logout'),
  },
};
