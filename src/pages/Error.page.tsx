import { Text } from '@ovhcloud/ods-react';
import { useRouteError } from 'react-router';

export const ErrorBoundary = ({ error }: { error?: unknown }) => {
  const routeError = useRouteError();
  return (
    <div className="m-8">
      <Text
        className="!text-[var(--ods-color-critical-400)]"
        preset="heading-3"
      >
        Error
      </Text>
      <Text className="whitespace-pre mt-8 block" preset="code">
        {JSON.stringify(routeError || error, null, 2)}
      </Text>
    </div>
  );
};
