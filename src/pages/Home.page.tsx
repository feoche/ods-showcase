import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  ButtonGroup, ButtonGroupItem,
  Card,
  Checkbox,
  CheckboxControl,
  CheckboxGroup,
  CheckboxLabel,
  Clipboard,
  ClipboardControl,
  ClipboardTrigger,
  Code,
  Combobox,
  ComboboxContent,
  ComboboxControl,
  Datepicker,
  DatepickerContent,
  DatepickerControl,
  Divider,
  Drawer,
  DRAWER_POSITION,
  DrawerBody,
  DrawerContent,
  DrawerTrigger,
  Editable, EditableActions, EditableDisplay, EditableDisplayEmpty,
  EditableInput,
  FileUpload,
  FileUploadList,
  FormField,
  FormFieldError,
  FormFieldHelper,
  FormFieldLabel,
  Icon,
  Input,
  Kbd,
  Link,
  Logo,
  Medium,
  Message,
  MessageBody,
  MessageIcon,
  Meter,
  Modal,
  ModalBody,
  ModalContent, ModalHeader,
  ModalTrigger,
  Pagination,
  Password,
  PhoneNumber,
  PhoneNumberControl,
  PhoneNumberCountryList,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ProgressBar,
  Quantity,
  QuantityControl,
  QuantityInput,
  Radio,
  RadioControl,
  RadioGroup,
  RadioLabel,
  Range,
  Select,
  SelectContent,
  SelectControl,
  Skeleton,
  Spinner,
  Tab,
  TabContent,
  Table,
  TabList,
  Tabs,
  Tag,
  Text,
  Textarea,
  Tile,
  Timepicker,
  TimepickerControl,
  TimepickerTimezoneList,
  Toaster,
  Toggle,
  ToggleControl, ToggleLabel,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TreeView, TreeViewNode, TreeViewNodes
} from '@ovhcloud/ods-react';
import * as React from 'react';

export const Home = () => {
  const [activeSection, setActiveSection] = React.useState<string>('accordion');
  const [isTocOpen, setIsTocOpen] = React.useState(false);

  const sections = [
    'Accordion', 'Badge', 'Breadcrumb', 'Button', 'ButtonGroup', 'Card', 'Checkbox', 'Clipboard', 'Code',
    'Combobox', 'Datepicker', 'Divider', 'Drawer', 'Editable', 'FileUpload', 'FormField', 'Icon', 'Input',
    'Kbd', 'Link', 'Logo', 'Medium', 'Message', 'Meter', 'Modal', 'Pagination', 'Password', 'PhoneNumber', 'Popover',
    'ProgressBar', 'Quantity', 'Radio', 'Range', 'Select', 'Skeleton', 'Spinner',
    'Table', 'Tabs', 'Tag', 'Text', 'Textarea', 'Tile', 'Timepicker', 'Toaster', 'Toggle', 'Tooltip', 'TreeView'
  ];

  const handleTocClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsTocOpen(false);
    }
  };

  return (
    <>
      {/* Table of Contents */}
      <Drawer open={isTocOpen} onOpenChange={(details) => setIsTocOpen(details.open)}>
        <DrawerTrigger asChild>
          <button
            className="toc-toggle"
            aria-label="Toggle navigation menu"
          />
        </DrawerTrigger>
        <DrawerContent
          aria-label="Components navigation"
          className="toc-container"
          position={DRAWER_POSITION.left}
        >
          <DrawerBody>
            <Text preset="label" className="toc-title">Components</Text>
            <div className="toc-list">
              {sections.map((section) => (
                <a
                  key={section.toLowerCase()}
                  href={`#${section.toLowerCase()}`}
                  className={`toc-link ${activeSection === section.toLowerCase() ? 'toc-link-active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleTocClick(section.toLowerCase());
                  }}
                >
                  {section}
                </a>
              ))}
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <main>
        {/* Page Header */}
        <header className="page-header">
          <Text preset="heading-1">ODS Components</Text>
          <div style={{position: 'absolute', top: 16, right: 16}}>
            <Toggle aria-label="Toggle light/dark theme" withLabels
                    defaultChecked={true}
                    onChange={(e: any) => {
                      const isLight = e.target.checked;
                      document.body.classList.toggle('theme-dark', !isLight);
                      document.body.classList.toggle('theme-light', isLight);
                    }}>
              <ToggleControl />
            </Toggle>
          </div>
        </header>

        {/* Accordion Section */}
        <section className="component-section" id="accordion">
          <Text preset="heading-2">Accordion</Text>
          <div className="component-grid">
            <div className="component-card">
              <Text preset="caption" className="component-card-label">Default</Text>
              <Accordion>
                <AccordionItem value="0">
                  <AccordionTrigger>
                    Hello World!
                  </AccordionTrigger>
                  <AccordionContent>
                    Lorem ipsum dolor sit amet.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="component-card">
              <Text preset="caption" className="component-card-label">Disabled State</Text>
              <Accordion>
                <AccordionItem
                  disabled
                  value="0"
                >
                  <AccordionTrigger>
                    Hello World!
                  </AccordionTrigger>
                  <AccordionContent>
                    Lorem ipsum dolor sit amet.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="component-card">
              <Text preset="caption" className="component-card-label">Multiple Items</Text>
              <Accordion>
                <AccordionItem value="1">
                  <AccordionTrigger>
                    <Text preset="heading-3">
                      Multiple
                    </Text>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Text preset="paragraph">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Text>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="2">
                  <AccordionTrigger>
                    <Text preset="heading-3">
                      Multiple
                    </Text>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Text preset="paragraph">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Text>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* Badge Section */}
        <section className="component-section" id="badge">
          <Text preset="heading-2">Badge</Text>
          <div className="component-grid">
            <div className="component-card">
              <Text preset="caption" className="component-card-label">Colors (Small)</Text>
              <div className="flex-row">
                <Badge color="alpha" size="sm">Alpha</Badge>
                <Badge color="beta" size="sm">Beta</Badge>
                <Badge color="critical" size="sm">Critical</Badge>
                <Badge color="information" size="sm">Information</Badge>
                <Badge color="neutral" size="sm">Neutral</Badge>
                <Badge color="new" size="sm">New</Badge>
                <Badge color="primary" size="sm">Primary</Badge>
                <Badge color="promotion" size="sm">Promotion</Badge>
                <Badge color="success" size="sm">Success</Badge>
                <Badge color="warning" size="sm">Warning</Badge>
              </div>
            </div>
            <div className="component-card">
              <Text preset="caption" className="component-card-label">Colors (Medium)</Text>
              <div className="flex-row">
                <Badge color="alpha">Alpha</Badge>
                <Badge color="beta">Beta</Badge>
                <Badge color="critical">Critical</Badge>
                <Badge color="information">Information</Badge>
                <Badge color="neutral">Neutral</Badge>
                <Badge color="new">New</Badge>
                <Badge color="primary">Primary</Badge>
                <Badge color="promotion">Promotion</Badge>
                <Badge color="success">Success</Badge>
                <Badge color="warning">Warning</Badge>
              </div>
            </div>
            <div className="component-card">
              <Text preset="caption" className="component-card-label">Colors (Large)</Text>
              <div className="flex-row">
                <Badge color="alpha" size="lg">Alpha</Badge>
                <Badge color="beta" size="lg">Beta</Badge>
                <Badge color="critical" size="lg">Critical</Badge>
                <Badge color="information" size="lg">Information</Badge>
                <Badge color="neutral" size="lg">Neutral</Badge>
                <Badge color="new" size="lg">New</Badge>
                <Badge color="primary" size="lg">Primary</Badge>
                <Badge color="promotion" size="lg">Promotion</Badge>
                <Badge color="success" size="lg">Success</Badge>
                <Badge color="warning" size="lg">Warning</Badge>
              </div>
            </div>
            <div className="component-card">
              <Text preset="caption" className="component-card-label">With Icon & Tooltip</Text>
              <div className="flex-row">
                <Badge>
                  <Icon aria-label="Promotion" role="img" name="tag"/>
                </Badge>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge aria-labelledby="tooltip-a11y" color="promotion" tabIndex={0}>
                      <Icon name="tag"/>
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent id="tooltip-a11y">
                    Promotion valid from November 22 to 26
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumb Section */}
        <section className="component-section" id="breadcrumb">
          <Text preset="heading-2">Breadcrumb</Text>
          <div className="component-grid">
            <div className="component-card full-width">
              <Text preset="caption" className="component-card-label">Default</Text>
              <Breadcrumb aria-label="Breadcrumb">
                <BreadcrumbItem>
                  <BreadcrumbLink aria-label="Home" href="#">
                    <Icon aria-hidden="true" name="home"/>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Category</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Subcategory</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Current page</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            </div>
            <div className="component-card full-width">
              <Text preset="caption" className="component-card-label">With Ellipsis</Text>
              <Breadcrumb nbItemsAfterEllipsis={4} nbItemsBeforeEllipsis={1}>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Products</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Hosting</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Servers</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Dedicated</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Rise</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">RISE-2</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            </div>
          </div>
        </section>

        {/* Button Section */}
        <section className="component-section" id="button">
          <Text preset="heading-2">Button</Text>
          <div className="component-grid">
            <div className="component-card">
              <Text preset="caption" className="component-card-label">Solid Variant - Colors</Text>
              <div className="flex-row">
                <Button color="primary">Primary</Button>
                <Button color="critical">Critical</Button>
                <Button color="information">Information</Button>
                <Button color="neutral">Neutral</Button>
                <Button color="success">Success</Button>
                <Button color="warning">Warning</Button>
              </div>
            </div>
            <div className="component-card">
              <Text preset="caption" className="component-card-label">Outline Variant</Text>
              <div className="flex-row">
                <Button color="primary" variant="outline">Primary</Button>
                <Button color="critical" variant="outline">Critical</Button>
                <Button color="information" variant="outline">Information</Button>
                <Button color="neutral" variant="outline">Neutral</Button>
                <Button color="success" variant="outline">Success</Button>
                <Button color="warning" variant="outline">Warning</Button>
              </div>
            </div>
            <div className="component-card">
              <Text preset="caption" className="component-card-label">Ghost Variant</Text>
              <div className="flex-row">
                <Button color="primary" variant="ghost">Primary</Button>
                <Button color="critical" variant="ghost">Critical</Button>
                <Button color="information" variant="ghost">Information</Button>
                <Button color="neutral" variant="ghost">Neutral</Button>
                <Button color="success" variant="ghost">Success</Button>
                <Button color="warning" variant="ghost">Warning</Button>
              </div>
            </div>
            <div className="component-card">
              <Text preset="caption" className="component-card-label">Sizes</Text>
              <div className="flex-row align-center">
                <Button size="xs">Extra Small</Button>
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
              </div>
            </div>
            <div className="component-card">
              <Text preset="caption" className="component-card-label">States</Text>
              <div className="flex-row">
                <Button loading>Loading</Button>
                <Button disabled>Disabled</Button>
                <Button variant="outline" disabled>Disabled Outline</Button>
              </div>
            </div>
            <div className="component-card">
              <Text preset="caption" className="component-card-label">With Icons</Text>
              <div className="flex-row">
                <Button aria-label="Clear">
                  <Icon name="xmark"/>
                </Button>
                <Button>
                  <Icon name="filter"/> Filter
                </Button>
                <Button>
                  Settings <Icon name="cog"/>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ButtonGroup Section */}
        <section className="component-section" id="buttongroup">
          <Text preset="heading-2">ButtonGroup</Text>
          <div className="component-grid">
            <div className="component-card">
              <Text preset="caption" className="component-card-label">Default</Text>
              <ButtonGroup>
                <ButtonGroupItem value={"1"}>First</ButtonGroupItem>
                <ButtonGroupItem value={"2"}>Second</ButtonGroupItem>
                <ButtonGroupItem value={"3"}>Third</ButtonGroupItem>
              </ButtonGroup>
            </div>
            <div className="component-card">
              <Text preset="caption" className="component-card-label">Outline Variant</Text>
              <ButtonGroup size="sm">
                <ButtonGroupItem value={"1"}>List</ButtonGroupItem>
                <ButtonGroupItem value={"2"}>Grid</ButtonGroupItem>
                <ButtonGroupItem value={"3"}>Table</ButtonGroupItem>
              </ButtonGroup>
            </div>
            <div className="component-card">
              <Text preset="caption" className="component-card-label">With Icons</Text>
              <ButtonGroup size="xs">
                <ButtonGroupItem value={"1"}><Icon name="arrow-left"/>Left</ButtonGroupItem>
                <ButtonGroupItem value={"2"}><Icon name="arrow-up"/>Center</ButtonGroupItem>
                <ButtonGroupItem value={"3"}><Icon name="arrow-right"/>Right</ButtonGroupItem>
              </ButtonGroup>
            </div>
          </div>
        </section>

        {/* Card Section */}
        <section className="component-section" id="card">
          <Text preset="heading-2">Card</Text>
          <div className="component-grid">
            <div className="component-card">
              <Text preset="caption" className="component-card-label">Default</Text>
              <Card>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Card>
            </div>
            <div className="component-card full-width">
              <Text preset="caption" className="component-card-label">Colors</Text>
              <div className="flex-row">
                <Card color="critical" style={{padding: '8px'}}>Critical</Card>
                <Card color="information" style={{padding: '8px'}}>Information</Card>
                <Card color="neutral" style={{padding: '8px'}}>Neutral</Card>
                <Card color="primary" style={{padding: '8px'}}>Primary</Card>
                <Card color="success" style={{padding: '8px'}}>Success</Card>
                <Card color="warning" style={{padding: '8px'}}>Warning</Card>
              </div>
            </div>
          </div>
        </section>

        {/* Checkbox Section */}
        <section className="component-section" id="checkbox">
          <Text preset="heading-2">Checkbox</Text>
          <div className="component-grid">
            <div className="component-card">
              <Text preset="caption" className="component-card-label">States</Text>
              <div className="flex-column">
                <Checkbox>
                  <CheckboxControl/>
                  <CheckboxLabel>Unchecked</CheckboxLabel>
                </Checkbox>
                <Checkbox checked>
                  <CheckboxControl/>
                  <CheckboxLabel>Checked</CheckboxLabel>
                </Checkbox>
                <Checkbox checked="indeterminate">
                  <CheckboxControl/>
                  <CheckboxLabel>Indeterminate</CheckboxLabel>
                </Checkbox>
                <Checkbox disabled>
                  <CheckboxControl/>
                  <CheckboxLabel>Disabled</CheckboxLabel>
                </Checkbox>
                <Checkbox invalid>
                  <CheckboxControl/>
                  <CheckboxLabel>Invalid</CheckboxLabel>
                </Checkbox>
              </div>
            </div>
            <div className="component-card">
              <Text preset="caption" className="component-card-label">Checkbox Group</Text>
              <CheckboxGroup defaultValue={['marketing']} name="acknowledgments">
                <Checkbox value="term">
                  <CheckboxControl/>
                  <CheckboxLabel>I agree to the terms and conditions.</CheckboxLabel>
                </Checkbox>
                <Checkbox value="marketing">
                  <CheckboxControl/>
                  <CheckboxLabel>I agree to receive marketing communications.</CheckboxLabel>
                </Checkbox>
              </CheckboxGroup>
            </div>
          </div>
        </section>

        {/* Clipboard Section */}
        <section className="component-section" id="clipboard">
          <Text preset="heading-2">Clipboard</Text>
          <div className="component-grid">
            <div className="component-card">
              <Text preset="caption" className="component-card-label">Default</Text>
              <Clipboard value="npm install @ovhcloud/ods-react">
                <ClipboardControl aria-label="Clipboard"/>
                <ClipboardTrigger/>
              </Clipboard>
            </div>
            <div className="component-card">
              <Text preset="caption" className="component-card-label">States</Text>
              <div className="flex-column">
                <Clipboard disabled value="Disabled">
                  <ClipboardControl aria-label="Clipboard"/>
                  <ClipboardTrigger/>
                </Clipboard>
                <Clipboard value="Loading">
                  <ClipboardControl aria-label="Clipboard" loading/>
                  <ClipboardTrigger/>
                </Clipboard>
                <Clipboard value="Masked">
                  <ClipboardControl aria-label="Clipboard" maskOption={{enable: true}}/>
                  <ClipboardTrigger/>
                </Clipboard>
              </div>
            </div>
          </div>
        </section>

        {/* Code Section */}
        <section className="component-section" id="code">
          <Text preset="heading-2">Code</Text>
          <div className="component-grid">
            <div className="component-card">
              <Text preset="caption" className="component-card-label">Inline</Text>
              <Code>console.log('Hello world');</Code>
            </div>
            <div className="component-card">
              <Text preset="caption" className="component-card-label">With Copy</Text>
              <Code canCopy>{`import { Text } from '@ovhcloud/ods-react';`}</Code>
            </div>
            <div className="component-card full-width">
              <Text preset="caption" className="component-card-label">Multi-line</Text>
              <Code canCopy>
                {`function isTargetInElement(event, element) {
  if (!element) {
    return false;
  }
  return element.contains(event.target) || event.composedPath().includes(element);
}`}
              </Code>
            </div>
          </div>
        </section>

        {/* Combobox Section */}
        <section className="component-section" id="combobox">
          <Text preset="heading-2">Combobox</Text>
          <div className="component-grid">
            <div className="component-card">
              <Text preset="caption" className="component-card-label">Default</Text>
              <Combobox
                items={[
                  {label: 'Dog', value: 'dog'},
                  {label: 'Cat', value: 'cat'},
                  {label: 'Hamster', value: 'hamster'},
                  {label: 'Parrot', value: 'parrot'},
                ]}
              >
                <ComboboxControl placeholder="Select a pet"/>
                <ComboboxContent/>
              </Combobox>
            </div>
            <div className="component-card">
              <Text preset="caption" className="component-card-label">Multiple</Text>
              <Combobox
                multiple
                items={[
                  {label: 'Dog', value: 'dog'},
                  {label: 'Cat', value: 'cat'},
                  {label: 'Hamster', value: 'hamster'},
                ]}
              >
                <ComboboxControl placeholder="Select pets"/>
                <ComboboxContent/>
              </Combobox>
            </div>
            <div className="component-card">
              <Text preset="caption" className="component-card-label">Highlight Results</Text>
              <Combobox
                highlightResults
                items={[
                  {label: 'France', value: 'fr'},
                  {label: 'Germany', value: 'de'},
                  {label: 'Italy', value: 'it'},
                ]}
              >
                <ComboboxControl placeholder="Search countries"/>
                <ComboboxContent/>
              </Combobox>
            </div>
            <div className="component-card">
              <Text preset="caption" className="component-card-label">States</Text>
              <div className="flex-column">
                <Combobox disabled items={[{label: 'Dog', value: 'dog'}]}>
                  <ComboboxControl placeholder="Disabled"/>
                  <ComboboxContent/>
                </Combobox>
                <Combobox readOnly items={[{label: 'Dog', value: 'dog'}]}>
                  <ComboboxControl placeholder="Readonly"/>
                  <ComboboxContent/>
                </Combobox>
              </div>
            </div>
          </div>
        </section>

        {/* Datepicker Section */}
        <section className="component-section" id="datepicker">
          <Text preset="heading-2">Datepicker</Text>
          <div className="component-grid">
            <div className="component-card">
              <Text preset="caption" className="component-card-label">Default</Text>
              <Datepicker>
                <DatepickerControl/>
                <DatepickerContent/>
              </Datepicker>
            </div>
            <div className="component-card">
              <Text preset="caption" className="component-card-label">Disabled</Text>
              <Datepicker disabled>
                <DatepickerControl/>
                <DatepickerContent/>
              </Datepicker>
            </div>
          </div>
        </section>

        {/* Divider Section */}
        <section className="component-section" id="divider">
          <Text preset="heading-2">Divider</Text>
          <div className="component-grid">
            <div className="component-card full-width">
              <Text preset="caption" className="component-card-label">Spacing Variants</Text>
              <div className="flex-column" style={{gap: '16px'}}>
                <Divider spacing="0" style={{width:'100%'}} />
                <Divider spacing="2" style={{width:'100%'}} />
                <Divider spacing="4" style={{width:'100%'}} />
                <Divider spacing="6" style={{width:'100%'}} />
              </div>
            </div>
          </div>
        </section>

        {/* Drawer Section */}
        <section className="component-section" id="drawer">
          <Text preset="heading-2">Drawer</Text>
          <div className="component-grid">
            <div className="component-card full-width">
              <Text preset="caption" className="component-card-label">Positions</Text>
              <div className="flex-row">
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button>Right Drawer</Button>
                  </DrawerTrigger>
                  <DrawerContent aria-label="Right Drawer" position={DRAWER_POSITION.right}>
                    <DrawerBody>
                      <Text preset="heading-4">Drawer Content</Text>
                      <Text preset="paragraph">This is the drawer body content.</Text>
                    </DrawerBody>
                  </DrawerContent>
                </Drawer>
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant="outline">Left</Button>
                  </DrawerTrigger>
                  <DrawerContent aria-label="Left Drawer" position={DRAWER_POSITION.left}>
                    <DrawerBody>Left drawer content</DrawerBody>
                  </DrawerContent>
                </Drawer>
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant="outline">Top</Button>
                  </DrawerTrigger>
                  <DrawerContent aria-label="Top Drawer" position={DRAWER_POSITION.top}>
                    <DrawerBody>Top drawer content</DrawerBody>
                  </DrawerContent>
                </Drawer>
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant="outline">Bottom</Button>
                  </DrawerTrigger>
                  <DrawerContent aria-label="Bottom Drawer" position={DRAWER_POSITION.bottom}>
                    <DrawerBody>Bottom drawer content</DrawerBody>
                  </DrawerContent>
                </Drawer>
              </div>
            </div>
          </div>
        </section>

        {/* Editable Section */}
        <section className="component-section" id="editable">
          <Text preset="heading-2">Editable</Text>
          <div className="component-grid">
            <div className="component-card">
              <Text preset="caption" className="component-card-label">Default</Text>
              <Editable>
                <EditableDisplay>
                  <EditableDisplayEmpty>Empty value</EditableDisplayEmpty>
                </EditableDisplay>

                <EditableInput>
                  <Input autoFocus />
                </EditableInput>

                <EditableActions />
              </Editable>
            </div>
          </div>
        </section>

        {/* FileUpload Section */}
        <section className="component-section" id="fileupload">
          <Text preset="heading-2">FileUpload</Text>
          <div className="component-grid">
            <div className="component-card full-width">
              <Text preset="caption" className="component-card-label">Default</Text>
              <FileUpload aria-label="File Upload">
                <FileUploadList/>
              </FileUpload>
            </div>
            <div className="component-card full-width">
              <Text preset="caption" className="component-card-label">With Constraints</Text>
              <FileUpload
                aria-label="File Upload"
                accept="image/*"
                maxFile={3}
                maxSize={5242880}
              >
                <FileUploadList/>
              </FileUpload>
            </div>
          </div>
        </section>

        {/* FormField Section */}
        <section className="component-section" id="formfield">
          <Text preset="heading-2">FormField</Text>
          <div className="component-grid">
            <div className="component-card">
              <Text preset="caption" className="component-card-label">With Helper</Text>
              <FormField>
                <FormFieldLabel>Username</FormFieldLabel>
                <Input placeholder="Enter username"/>
                <FormFieldHelper>Must be at least 3 characters</FormFieldHelper>
              </FormField>
            </div>
            <div className="component-card">
              <Text preset="caption" className="component-card-label">With Error</Text>
              <FormField invalid>
                <FormFieldLabel>Email</FormFieldLabel>
                <Input placeholder="Enter email" defaultValue="invalid-email"/>
                <FormFieldError>Please enter a valid email address</FormFieldError>
              </FormField>
            </div>
          </div>
        </section>

        {/* Icon Section */}
        <section className="component-section" id="icon">
          <Text preset="heading-2">Icon</Text>
          <div className="component-grid">
            <div className="component-card full-width">
              <Text preset="caption" className="component-card-label">Common Icons</Text>
              <div className="flex-row" style={{fontSize: '24px', gap: '16px'}}>
                <Icon name="home" aria-label="Home" role="img"/>
                <Icon name="cog" aria-label="Settings" role="img"/>
                <Icon name="magnifying-glass" aria-label="Search" role="img"/>
                <Icon name="circle-question" aria-label="Help" role="img"/>
                <Icon name="star" aria-label="Favorite" role="img"/>
                <Icon name="cloud" aria-label="Cloud" role="img"/>
                <Icon name="download" aria-label="Download" role="img"/>
                <Icon name="email" aria-label="Email" role="img"/>
                <Icon name="xmark" aria-label="Close" role="img"/>
                <Icon name="filter" aria-label="Filter" role="img"/>
              </div>
            </div>
          </div>
        </section>

        {/* Input Section */}
        <section className="component-section" id="input">
          <Text preset="heading-2">Input</Text>
          <div className="component-grid">
            <div className="component-card">
              <Text preset="caption" className="component-card-label">Types</Text>
              <div className="flex-column">
                <Input placeholder="Text input" type="text"/>
                <Input placeholder="Email input" type="email"/>
                <Input placeholder="Number input" type="number"/>
                <Input placeholder="Search input" type="search"/>
              </div>
            </div>
            <div className="component-card">
              <Text preset="caption" className="component-card-label">States</Text>
              <div className="flex-column">
                <Input placeholder="Default"/>
                <Input placeholder="Disabled" disabled/>
                <Input defaultValue="Readonly" readOnly/>
                <Input defaultValue="Clearable" clearable/>
                <Input placeholder="Loading" loading/>
              </div>
            </div>
          </div>
        </section>

        {/* Kbd Section */}
        <section className="component-section" id="kbd">
          <Text preset="heading-2">Kbd</Text>
          <div className="component-grid">
            <div className="component-card full-width">
              <Text preset="caption" className="component-card-label">Keyboard Shortcuts</Text>
              <div className="flex-row" style={{ gap: '16px', alignItems: 'center' }}>
                <div className="flex-row" style={{ gap: '4px' }}>
                  <Kbd>Ctrl</Kbd>
                  <span>+</span>
                  <Kbd>C</Kbd>
                  <span>to copy</span>
                </div>
                <div className="flex-row" style={{ gap: '4px' }}>
                  <Kbd>Ctrl</Kbd>
                  <span>+</span>
                  <Kbd>V</Kbd>
                  <span>to paste</span>
                </div>
                <div className="flex-row" style={{ gap: '4px' }}>
                  <Kbd>⌘</Kbd>
                  <span>+</span>
                  <Kbd>S</Kbd>
                  <span>to save</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Link Section */}
        <section className="component-section" id="link">
          <Text preset="heading-2">Link</Text>
          <div className="component-grid">
            <div className="component-card">
              <Text preset="caption" className="component-card-label">Default</Text>
              <div className="flex-row">
                <Link href="https://www.ovhcloud.com">Default Link</Link>
                <Link href="https://www.ovhcloud.com" disabled>Disabled</Link>
              </div>
            </div>
            <div className="component-card">
              <Text preset="caption" className="component-card-label">With Icons</Text>
              <div className="flex-row">
                <Link href="https://www.ovhcloud.com">
                  <Icon name="arrow-left" aria-hidden="true"/> Back
                </Link>
                <Link href="https://www.ovhcloud.com" target="_blank">
                  External <Icon name="external-link" aria-hidden="true"/>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Logo Section */}
        <section className="component-section" id="logo">
          <Text preset="heading-2">Logo</Text>
          <div className="component-grid">
            <div className="component-card">
              <Text preset="caption" className="component-card-label">Default</Text>
              <Logo size="lg"/>
            </div>
          </div>
        </section>

        {/* Medium Section */}
        <section className="component-section" id="medium">
          <Text preset="heading-2">Medium</Text>
          <div className="component-grid">
            <div className="component-card">
              <Text preset="caption" className="component-card-label">Image</Text>
              <div className="flex-row align-center">
                <Medium
                  alt="OVHcloud logo"
                  src="https://images.crunchbase.com/image/upload/c_pad,w_256,f_auto,q_auto:eco,dpr_1/ayzwkdawmlyzvuummuf4"
                  height={80}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Message Section */}
        <section className="component-section" id="message">
          <Text preset="heading-2">Message</Text>
          <div className="component-grid">
            <div className="component-card full-width">
              <Text preset="caption" className="component-card-label">Colors</Text>
              <div className="flex-column">
                <Message color="success">
                  <MessageIcon name="circle-check"/>
                  <MessageBody>Success message</MessageBody>
                </Message>
                <Message color="information">
                  <MessageIcon name="circle-info"/>
                  <MessageBody>Information message</MessageBody>
                </Message>
                <Message color="warning">
                  <MessageIcon name="triangle-exclamation"/>
                  <MessageBody>Warning message</MessageBody>
                </Message>
                <Message color="critical">
                  <MessageIcon name="hexagon-exclamation"/>
                  <MessageBody>Critical message</MessageBody>
                </Message>
                <Message color="neutral">
                  <MessageIcon name="email"/>
                  <MessageBody>Neutral message</MessageBody>
                </Message>
              </div>
            </div>
          </div>
        </section>

        {/* Meter Section */}
        <section className="component-section" id="meter">
          <Text preset="heading-2">Meter</Text>
          <div className="component-grid">
            <div className="component-card full-width">
              <Text preset="caption" className="component-card-label">Usage Indicators</Text>
              <div className="flex-column" style={{ gap: '16px' }}>
                <div>
                  <Text preset="caption">Low (30%)</Text>
                  <Meter value={30} max={100} aria-label="30% usage"/>
                </div>
                <div>
                  <Text preset="caption">Medium (60%)</Text>
                  <Meter value={60} max={100} aria-label="60% usage"/>
                </div>
                <div>
                  <Text preset="caption">High (90%)</Text>
                  <Meter value={90} max={100} aria-label="90% usage"/>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Modal Section */}
        <section className="component-section" id="modal">
          <Text preset="heading-2">Modal</Text>
          <div className="component-grid">
            <div className="component-card full-width">
              <Text preset="caption" className="component-card-label">Variants</Text>
              <div className="flex-row">
                <Modal>
                  <ModalTrigger asChild>
                    <Button>Default Modal</Button>
                  </ModalTrigger>
                  <ModalContent>
                    <ModalHeader>
                      My modal header
                    </ModalHeader>
                    <ModalBody>
                      My modal content
                    </ModalBody>
                  </ModalContent>
                </Modal>
                <Modal>
                  <ModalTrigger asChild>
                    <Button color="critical">Critical Modal</Button>
                  </ModalTrigger>
                  <ModalContent>
                    <ModalHeader>
                      Delete Item?
                    </ModalHeader>
                    <ModalBody>
                      <Text preset="paragraph">This action cannot be undone.</Text>
                    </ModalBody>
                  </ModalContent>
                </Modal>
              </div>
            </div>
          </div>
        </section>

        {/* Pagination Section */}
        <section className="component-section" id="pagination">
          <Text preset="heading-2">Pagination</Text>
          <div className="component-grid">
            <div className="component-card full-width">
              <Text preset="caption" className="component-card-label">Default</Text>
              <Pagination aria-label="Pagination" totalItems={500}/>
            </div>
            <div className="component-card full-width">
              <Text preset="caption" className="component-card-label">With Page Size Selector</Text>
              <Pagination
                totalItems={500}
                withPageSizeSelector
                renderTotalItemsLabel={({totalItems}) => `of ${totalItems} results`}
              />
            </div>
          </div>
        </section>

        {/* Password Section */}
        <section className="component-section" id="password">
          <Text preset="heading-2">Password</Text>
          <div className="component-grid">
            <div className="component-card">
              <Text preset="caption" className="component-card-label">States</Text>
              <div className="flex-column">
                <Password placeholder="Enter password"/>
                <Password placeholder="Disabled" disabled/>
                <Password defaultValue="Clearable" clearable/>
              </div>
            </div>
          </div>
        </section>

        {/* PhoneNumber Section */}
        <section className="component-section" id="phonenumber">
          <Text preset="heading-2">PhoneNumber</Text>
          <div className="component-grid">
            <div className="component-card">
              <Text preset="caption" className="component-card-label">Default</Text>
              <PhoneNumber>
                <PhoneNumberCountryList/>
                <PhoneNumberControl/>
              </PhoneNumber>
            </div>
            <div className="component-card">
              <Text preset="caption" className="component-card-label">Limited Countries</Text>
              <PhoneNumber countries={['fr', 'de', 'gb', 'us']}>
                <PhoneNumberCountryList/>
                <PhoneNumberControl clearable/>
              </PhoneNumber>
            </div>
          </div>
        </section>

        {/* Popover Section */}
        <section className="component-section" id="popover">
          <Text preset="heading-2">Popover</Text>
          <div className="component-grid">
            <div className="component-card">
              <Text preset="caption" className="component-card-label">Default</Text>
              <Popover>
                <PopoverTrigger asChild>
                  <Button>Show Popover</Button>
                </PopoverTrigger>
                <PopoverContent withArrow>
                  <Text preset="paragraph">This is popover content</Text>
                </PopoverContent>
              </Popover>
            </div>
            <div className="component-card">
              <Text preset="caption" className="component-card-label">Positions</Text>
              <div className="flex-row">
                <Popover position="top">
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">Top</Button>
                  </PopoverTrigger>
                  <PopoverContent withArrow>Top popover</PopoverContent>
                </Popover>
                <Popover position="bottom">
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">Bottom</Button>
                  </PopoverTrigger>
                  <PopoverContent withArrow>Bottom popover</PopoverContent>
                </Popover>
                <Popover position="left">
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">Left</Button>
                  </PopoverTrigger>
                  <PopoverContent withArrow>Left popover</PopoverContent>
                </Popover>
                <Popover position="right">
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">Right</Button>
                  </PopoverTrigger>
                  <PopoverContent withArrow>Right popover</PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </section>

        {/* ProgressBar Section */}
        <section className="component-section" id="progressbar">
          <Text preset="heading-2">ProgressBar</Text>
          <div className="component-grid">
            <div className="component-card full-width">
              <Text preset="caption" className="component-card-label">Values</Text>
              <div className="flex-column">
                <ProgressBar aria-label="Loading"/>
                <ProgressBar value="25" aria-label="25% complete"/>
                <ProgressBar value="50" aria-label="50% complete"/>
                <ProgressBar value="75" aria-label="75% complete"/>
                <ProgressBar value="100" aria-label="Complete"/>
              </div>
            </div>
          </div>
        </section>

        {/* Quantity Section */}
        <section className="component-section" id="quantity">
          <Text preset="heading-2">Quantity</Text>
          <div className="component-grid">
            <div className="component-card">
              <Text preset="caption" className="component-card-label">Default</Text>
              <Quantity min={0} max={10}>
                <QuantityControl>
                  <QuantityInput/>
                </QuantityControl>
              </Quantity>
            </div>
            <div className="component-card">
              <Text preset="caption" className="component-card-label">With Step</Text>
              <Quantity step={5} min={0} max={100}>
                <QuantityControl>
                  <QuantityInput/>
                </QuantityControl>
              </Quantity>
            </div>
          </div>
        </section>

        {/* RadioGroup Section */}
        <section className="component-section" id="radiogroup">
          <Text preset="heading-2">RadioGroup</Text>
          <div className="component-grid">
            <div className="component-card">
              <Text preset="caption" className="component-card-label">Vertical</Text>
              <RadioGroup defaultValue="option1">
                <Radio value="option1">
                  <RadioControl/>
                  <RadioLabel>Option 1</RadioLabel>
                </Radio>
                <Radio value="option2">
                  <RadioControl/>
                  <RadioLabel>Option 2</RadioLabel>
                </Radio>
                <Radio value="option3" disabled>
                  <RadioControl/>
                  <RadioLabel>Disabled</RadioLabel>
                </Radio>
              </RadioGroup>
            </div>
            <div className="component-card">
              <Text preset="caption" className="component-card-label">Horizontal</Text>
              <RadioGroup orientation="horizontal" defaultValue="a">
                <Radio value="a">
                  <RadioControl/>
                  <RadioLabel>A</RadioLabel>
                </Radio>
                <Radio value="b">
                  <RadioControl/>
                  <RadioLabel>B</RadioLabel>
                </Radio>
                <Radio value="c">
                  <RadioControl/>
                  <RadioLabel>C</RadioLabel>
                </Radio>
              </RadioGroup>
            </div>
          </div>
        </section>

        {/* Range Section */}
        <section className="component-section" id="range">
          <Text preset="heading-2">Range</Text>
          <div className="component-grid">
            <div className="component-card full-width">
              <Text preset="caption" className="component-card-label">Single Value</Text>
              <Range defaultValue={[50]}/>
            </div>
            <div className="component-card full-width">
              <Text preset="caption" className="component-card-label">Range</Text>
              <Range defaultValue={[25, 75]}/>
            </div>
            <div className="component-card full-width">
              <Text preset="caption" className="component-card-label">With Ticks</Text>
              <Range defaultValue={[50]} ticks={[0, 25, 50, 75, 100]}/>
            </div>
          </div>
        </section>

        {/* Select Section */}
        <section className="component-section" id="select">
          <Text preset="heading-2">Select</Text>
          <div className="component-grid">
            <div className="component-card">
              <Text preset="caption" className="component-card-label">Default</Text>
              <Select
                items={[
                  {label: 'Option 1', value: '1'},
                  {label: 'Option 2', value: '2'},
                  {label: 'Option 3', value: '3'},
                ]}
              >
                <SelectControl aria-label="Select option" placeholder="Select..."/>
                <SelectContent/>
              </Select>
            </div>
            <div className="component-card">
              <Text preset="caption" className="component-card-label">Grouped</Text>
              <Select
                items={[
                  {
                    label: 'Fruits',
                    options: [
                      {label: 'Apple', value: 'apple'},
                      {label: 'Banana', value: 'banana'},
                    ],
                  },
                  {
                    label: 'Vegetables',
                    options: [
                      {label: 'Carrot', value: 'carrot'},
                      {label: 'Broccoli', value: 'broccoli'},
                    ],
                  },
                ]}
              >
                <SelectControl aria-label="Select food"/>
                <SelectContent/>
              </Select>
            </div>
            <div className="component-card">
              <Text preset="caption" className="component-card-label">Multiple</Text>
              <Select
                multiple
                items={[
                  {label: 'Red', value: 'red'},
                  {label: 'Green', value: 'green'},
                  {label: 'Blue', value: 'blue'},
                ]}
              >
                <SelectControl aria-label="Select colors" placeholder="Select colors"/>
                <SelectContent/>
              </Select>
            </div>
          </div>
        </section>

        {/* Skeleton Section */}
        <section className="component-section" id="skeleton">
          <Text preset="heading-2">Skeleton</Text>
          <div className="component-grid">
            <div className="component-card full-width">
              <Text preset="caption" className="component-card-label">Default</Text>
              <div aria-busy="true" className="flex-column">
                <Skeleton style={{width: '100%', height: '20px'}}/>
                <Skeleton style={{width: '80%', height: '20px'}}/>
                <Skeleton style={{width: '60%', height: '20px'}}/>
              </div>
            </div>
          </div>
        </section>

        {/* Spinner Section */}
        <section className="component-section" id="spinner">
          <Text preset="heading-2">Spinner</Text>
          <div className="component-grid">
            <div className="component-card">
              <Text preset="caption" className="component-card-label">Sizes & Colors</Text>
              <div className="flex-row align-center">
                <Spinner aria-label="Loading" color="neutral" size="xs"/>
                <Spinner aria-label="Loading" color="primary" size="sm"/>
                <Spinner aria-label="Loading" color="neutral" size="md"/>
                <Spinner aria-label="Loading" color="primary" size="lg"/>
              </div>
            </div>
          </div>
        </section>

        {/* Table Section */}
        <section className="component-section" id="table">
          <Text preset="heading-2">Table</Text>
          <div className="component-grid">
            <div className="component-card full-width">
              <Text preset="caption" className="component-card-label">Default</Text>
              <Table size="md">
                <caption>Team Members</caption>
                <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Role</th>
                  <th scope="col">Status</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>Alice</td>
                  <td>Developer</td>
                  <td>Active</td>
                </tr>
                <tr>
                  <td>Bob</td>
                  <td>Designer</td>
                  <td>Active</td>
                </tr>
                <tr>
                  <td>Charlie</td>
                  <td>Manager</td>
                  <td>Away</td>
                </tr>
                </tbody>
              </Table>
            </div>
            <div className="component-card full-width">
              <Text preset="caption" className="component-card-label">Striped</Text>
              <Table variant="striped" size="sm">
                <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Price</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>VPS</td>
                  <td>$5/mo</td>
                </tr>
                <tr>
                  <td>Dedicated</td>
                  <td>$50/mo</td>
                </tr>
                <tr>
                  <td>Cloud</td>
                  <td>$10/mo</td>
                </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="component-section" id="tabs">
          <Text preset="heading-2">Tabs</Text>
          <div className="component-grid">
            <div className="component-card full-width">
              <Text preset="caption" className="component-card-label">Default</Text>
              <Tabs defaultValue="tab1">
                <TabList>
                  <Tab value="tab1">Overview</Tab>
                  <Tab value="tab2">Features</Tab>
                  <Tab value="tab3">Pricing</Tab>
                  <Tab value="tab4" disabled>Disabled</Tab>
                </TabList>
                <TabContent value="tab1">
                  <Text preset="paragraph">Overview content goes here.</Text>
                </TabContent>
                <TabContent value="tab2">
                  <Text preset="paragraph">Features content goes here.</Text>
                </TabContent>
                <TabContent value="tab3">
                  <Text preset="paragraph">Pricing content goes here.</Text>
                </TabContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Tag Section */}
        <section className="component-section" id="tag">
          <Text preset="heading-2">Tag</Text>
          <div className="component-grid">
            <div className="component-card">
              <Text preset="caption" className="component-card-label">Colors</Text>
              <div className="flex-row">
                <Tag color="critical">Critical</Tag>
                <Tag color="information">Information</Tag>
                <Tag color="neutral">Neutral</Tag>
                <Tag color="primary">Primary</Tag>
                <Tag color="success">Success</Tag>
                <Tag color="warning">Warning</Tag>
              </div>
            </div>
            <div className="component-card">
              <Text preset="caption" className="component-card-label">Sizes</Text>
              <div className="flex-row align-center">
                <Tag color="primary" size="md">Medium</Tag>
                <Tag color="primary" size="lg">Large</Tag>
              </div>
            </div>
          </div>
        </section>

        {/* Text Section */}
        <section className="component-section" id="text">
          <Text preset="heading-2">Text</Text>
          <div className="component-grid">
            <div className="component-card full-width">
              <Text preset="caption" className="component-card-label">Headings</Text>
              <Text preset="heading-1">Heading 1</Text>
              <Text preset="heading-2">Heading 2</Text>
              <Text preset="heading-3">Heading 3</Text>
              <Text preset="heading-4">Heading 4</Text>
              <Text preset="heading-5">Heading 5</Text>
              <Text preset="heading-6">Heading 6</Text>
            </div>
            <div className="component-card">
              <Text preset="caption" className="component-card-label">Other Presets</Text>
              <div className="flex-column">
                <Text preset="paragraph">Paragraph - Lorem ipsum dolor sit amet.</Text>
                <Text preset="caption">Caption text</Text>
                <Text preset="label">Label text</Text>
                <Text preset="code">Code text</Text>
                <Text preset="span">Span text</Text>
              </div>
            </div>
          </div>
        </section>

        {/* Textarea Section */}
        <section className="component-section" id="textarea">
          <Text preset="heading-2">Textarea</Text>
          <div className="component-grid">
            <div className="component-card">
              <Text preset="caption" className="component-card-label">States</Text>
              <div className="flex-column">
                <Textarea placeholder="Default textarea"/>
                <Textarea placeholder="Disabled" disabled/>
                <Textarea defaultValue="Readonly content" readOnly/>
              </div>
            </div>
            <div className="component-card">
              <Text preset="caption" className="component-card-label">With Form Field</Text>
              <FormField>
                <FormFieldLabel>Description</FormFieldLabel>
                <Textarea placeholder="Enter description"/>
                <FormFieldHelper>Max 500 characters</FormFieldHelper>
              </FormField>
            </div>
          </div>
        </section>

        {/* Tile Section */}
        <section className="component-section" id="tile">
          <Text preset="heading-2">Tile</Text>
          <div className="component-grid">
            <div className="component-card">
              <Text preset="caption" className="component-card-label">Default</Text>
              <Tile>
                <Text preset="heading-4">Tile Title</Text>
                <Text preset="paragraph">This is tile content with some description.</Text>
              </Tile>
            </div>
            <div className="component-card">
              <Text preset="caption" className="component-card-label">With Icon</Text>
              <Tile>
                <Icon name="server" style={{ fontSize: '32px' }}/>
                <Text preset="heading-4">Server Tile</Text>
                <Text preset="paragraph">Server configuration tile.</Text>
              </Tile>
            </div>
          </div>
        </section>

        {/* Timepicker Section */}
        <section className="component-section" id="timepicker">
          <Text preset="heading-2">Timepicker</Text>
          <div className="component-grid">
            <div className="component-card">
              <Text preset="caption" className="component-card-label">Default</Text>
              <Timepicker>
                <TimepickerControl/>
              </Timepicker>
            </div>
            <div className="component-card">
              <Text preset="caption" className="component-card-label">With Seconds & Timezone</Text>
              <Timepicker withSeconds>
                <TimepickerControl/>
                <TimepickerTimezoneList/>
              </Timepicker>
            </div>
          </div>
        </section>

        {/* Toaster Section */}
        <section className="component-section" id="toaster">
          <Text preset="heading-2">Toaster</Text>
          <div className="component-grid">
            <div className="component-card full-width">
              <Text preset="caption" className="component-card-label">Toast Notifications Container</Text>
              <Text preset="paragraph">
                The Toaster component provides a container for displaying toast notifications.
                Toasts typically appear from actions and provide feedback to users.
              </Text>
              <Toaster />
            </div>
          </div>
        </section>

        {/* Toggle Section */}
        <section className="component-section" id="toggle">
          <Text preset="heading-2">Toggle</Text>
          <div className="component-grid">
            <div className="component-card">
              <Text preset="caption" className="component-card-label">States</Text>
              <div className="flex-column">
                <Toggle>
                  <ToggleControl/>
                  <ToggleLabel>
                    Enable Feature
                  </ToggleLabel>
                </Toggle>
                <Toggle>
                  <ToggleControl/>
                  <ToggleLabel>
                    Disabled
                  </ToggleLabel>
                </Toggle>
                <Toggle withLabels>
                  <ToggleControl/>
                  <ToggleLabel>
                    With labels
                  </ToggleLabel>
                </Toggle>
              </div>
            </div>
            <div className="component-card">
              <Text preset="caption" className="component-card-label">With Form Field</Text>
              <FormField>
                <FormFieldLabel>Dark Mode</FormFieldLabel>
                <Toggle withLabels>
                  <ToggleControl/>
                  <ToggleLabel>
                    Dark Mode
                  </ToggleLabel>
                </Toggle>
              </FormField>
            </div>
          </div>
        </section>

        {/* Tooltip Section */}
        <section className="component-section" id="tooltip">
          <Text preset="heading-2">Tooltip</Text>
          <div className="component-grid">
            <div className="component-card">
              <Text preset="caption" className="component-card-label">Default</Text>
              <div className="flex-row">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button>Hover me</Button>
                  </TooltipTrigger>
                  <TooltipContent>This is a tooltip</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Icon
                      name="circle-question"
                      style={{fontSize: '24px', cursor: 'help'}}
                      aria-label="Help"
                      role="img"
                      tabIndex={0}
                    />
                  </TooltipTrigger>
                  <TooltipContent>Additional information</TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </section>

        {/* TreeView Section */}
        <section className="component-section" id="treeview">
          <Text preset="heading-2">TreeView</Text>
          <div className="component-grid">
            <div className="component-card full-width">
              <Text preset="caption" className="component-card-label">Hierarchical Navigation</Text>
              <TreeView
                items={[
                  {
                    children: [
                      {
                        id: 'app.tsx',
                        name: 'app.tsx'
                      },
                      {
                        id: 'index.ts',
                        name: 'index.ts'
                      },
                      {
                        children: [
                          {
                            id: 'Button.tsx',
                            name: 'Button.tsx'
                          },
                          {
                            id: 'Card.tsx',
                            name: 'Card.tsx'
                          }
                        ],
                        id: 'components',
                        name: 'components'
                      }
                    ],
                    id: 'src',
                    name: 'src'
                  },
                  {
                    id: 'package.json',
                    name: 'package.json'
                  },
                  {
                    id: 'readme.md',
                    name: 'README.md'
                  }
                ]}
              >
                <TreeViewNodes>
                  <TreeViewNode
                    item={{
                      children: [
                        {
                          id: 'app.tsx',
                          name: 'app.tsx'
                        },
                        {
                          id: 'index.ts',
                          name: 'index.ts'
                        },
                        {
                          children: [
                            {
                              id: 'Button.tsx',
                              name: 'Button.tsx'
                            },
                            {
                              id: 'Card.tsx',
                              name: 'Card.tsx'
                            }
                          ],
                          id: 'components',
                          name: 'components'
                        }
                      ],
                      id: 'src',
                      name: 'src'
                    }}
                  />
                  <TreeViewNode
                    item={{
                      id: 'package.json',
                      name: 'package.json'
                    }}
                  />
                  <TreeViewNode
                    item={{
                      id: 'readme.md',
                      name: 'README.md'
                    }}
                  />
                </TreeViewNodes>
              </TreeView>
            </div>
          </div>
        </section>
      </main>
    </>
  )
};
