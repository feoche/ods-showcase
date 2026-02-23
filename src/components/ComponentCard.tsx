import * as React from 'react';
import reactElementToJsxString from 'react-element-to-jsx-string';
import {Button, Icon, Tooltip, TooltipContent, TooltipTrigger} from "@ovhcloud/ods-react";

interface ComponentCardProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export const ComponentCard = ({ label, children, className }: ComponentCardProps) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    const elements = React.Children.toArray(children);
    const code = elements
      .map((el) => reactElementToJsxString(el as React.ReactElement, { showDefaultProps: false, showFunctions: false }))
      .join('\n');

    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className={`component-card${className ? ` ${className}` : ''}`}>
      <div className="component-card-header">
        <span className="component-card-label">{label}</span>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="xs"
              color="primary"
              className={`component-card-copy${copied ? ' copied' : ''}`}
              onClick={handleCopy}
              aria-label={copied ? 'Copied!' : 'Copy code'}
            >
              {copied ? <Icon name="check" /> : <Icon name="file-copy" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>{copied ? 'Copied!' : 'Copy code'}</TooltipContent>
        </Tooltip>
      </div>
      {children}
    </div>
  );
};

