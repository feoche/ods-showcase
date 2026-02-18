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
  ButtonGroup,
  ButtonGroupItem,
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
  Editable,
  EditableActions,
  EditableDisplay,
  EditableDisplayEmpty,
  EditableInput,
  FileUpload,
  FileUploadList,
  FormField,
  FormFieldError,
  FormFieldHelper,
  FormFieldLabel,
  FormFieldLabelSubLabel,
  Icon,
  ICON_NAME,
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
  ModalContent,
  ModalHeader,
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
  toast,
  Toaster,
  Toggle,
  ToggleControl,
  ToggleLabel,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TreeView,
  TreeViewNode,
  TreeViewNodes
} from '@ovhcloud/ods-react';

import lang from '@shikijs/langs/typescript';
import theme from '@shikijs/themes/nord';

import * as React from 'react';

export const Home = () => {
  const [isTocOpen, setIsTocOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const sections = [
    'Accordion', 'Badge', 'Breadcrumb', 'Button', 'ButtonGroup', 'Card', 'Checkbox', 'Clipboard', 'Code',
    'Combobox', 'Datepicker', 'Divider', 'Drawer', 'Editable', 'FileUpload', 'FormField', 'Icon', 'Input',
    'Kbd', 'Link', 'Logo', 'Medium', 'Message', 'Meter', 'Modal', 'Pagination', 'Password', 'PhoneNumber', 'Popover',
    'ProgressBar', 'Quantity', 'RadioGroup', 'Range', 'Select', 'Skeleton', 'Spinner',
    'Table', 'Tabs', 'Tag', 'Text', 'Textarea', 'Tile', 'Timepicker', 'Toaster', 'Toggle', 'Tooltip', 'TreeView'
  ];

  // Component categories
  const componentCategories: Record<string, string[]> = {
    'all': sections,
    'Form Elements': ['Checkbox', 'Clipboard', 'Combobox', 'Datepicker', 'Editable', 'FileUpload', 'FormField', 'Input',
      'Password', 'PhoneNumber', 'Quantity', 'RadioGroup', 'Range', 'Select', 'Textarea',
      'Timepicker', 'Toggle'],
    'Navigation': ['Breadcrumb', 'Drawer', 'Link', 'Pagination', 'Tabs'],
    'Feedback': ['Message', 'Modal', 'Popover', 'Spinner', 'Toaster', 'Tooltip', 'ProgressBar', 'Skeleton'],
    'Data Display': ['Accordion', 'Badge', 'Card', 'Code', 'Divider', 'Icon', 'Kbd', 'Logo', 'Medium',
      'Meter', 'Table', 'Tag', 'Text', 'Tile', 'TreeView'],
    'Actions': ['Button', 'ButtonGroup']
  };

  // Filter sections based on search and category
  const filteredSections = React.useMemo(() => {
    let filtered = sections;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = componentCategories[selectedCategory] || sections;
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(section =>
        section.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  // Handle initial URL hash on page load
  React.useEffect(() => {
    const fullHash = window.location.hash; // e.g., "#/" or "#/#button" or "#button"
    // Extract the anchor part (the second # if it exists)
    const hashParts = fullHash.split('#').filter(part => part);
    const anchorId = hashParts.length > 1 ? hashParts[1] : null;

    if (anchorId && anchorId !== '/' && !anchorId.startsWith('/')) {
      const element = document.getElementById(anchorId);
      if (element) {
        // Small delay to ensure the page is fully rendered
        setTimeout(() => {
          element.scrollIntoView({behavior: 'smooth'});
        }, 100);
      }
    }
  }, []);

  const setActiveSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({behavior: 'smooth'});
      const currentHash = window.location.hash; // e.g., "#/" or "#/design-tokens"
      const routePart = currentHash.split('#')[1] || '/'; // Get "/", "/design-tokens", etc.
      window.location.hash = `${routePart}#${sectionId}`;
    }
  }

  const handleTocClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsTocOpen(false);
  };

  const handleThemeToggle = (checked: boolean) => {
    setIsDarkMode(!checked);
    document.body.classList.toggle('theme-dark', !checked);
    document.body.classList.toggle('theme-light', checked);
  };

  // Check if component should be visible based on filters
  const isComponentVisible = (componentName: string) => {
    return filteredSections.includes(componentName);
  };

  return (
    <>
      {/* Fixed Navbar */}
      <nav className="navbar">
        <div className="navbar-content">
          {/* Hamburger Menu (Drawer Trigger) */}
          <Drawer open={isTocOpen} onOpenChange={(details) => setIsTocOpen(details.open)}>
            <DrawerTrigger asChild>
              <button className="navbar-hamburger" aria-label="Open menu">
                <span className="hamburger-icon">☰</span>
              </button>
            </DrawerTrigger>
            <DrawerContent className="toc-container" position={DRAWER_POSITION.left}>
              <DrawerBody>
                <Text preset="label" className="toc-title">Components</Text>
                <div className="toc-list">
                  {sections.map((section) => (
                    <a
                      key={section.toLowerCase()}
                      href={`#${section.toLowerCase()}`}
                      className="toc-link"
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

          {/* Title */}
          <div className="navbar-title">
            <Text preset="heading-3">ODS Components</Text>
          </div>

          {/* Search Input */}
          <div className="navbar-search">
            <Input
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e: any) => setSearchQuery(e.target.value)}
              clearable
            />
          </div>

          {/* Category Filter */}
          <div className="navbar-filter">
            <Select
              items={[
                {label: 'All Components', value: 'all'},
                {label: 'Form Elements', value: 'Form Elements'},
                {label: 'Navigation', value: 'Navigation'},
                {label: 'Feedback', value: 'Feedback'},
                {label: 'Data Display', value: 'Data Display'},
                {label: 'Actions', value: 'Actions'}
              ]}
              value={[selectedCategory]}
              onValueChange={(details: any) => setSelectedCategory(details.value)}
            >
              <SelectControl placeholder="Category"/>
              <SelectContent/>
            </Select>
          </div>

          {/* Theme Toggle */}
          <div className="navbar-toggle">
            <Toggle
              withLabels
              checked={!isDarkMode}
              onChange={(e: any) => handleThemeToggle(e.target.checked)}
            >
              <ToggleControl/>
            </Toggle>
          </div>
        </div>
      </nav>

      <main>
        {isComponentVisible('Accordion') && (
          <section className="component-section" id="accordion">
            <Text preset="heading-2" className="section-heading" onClick={() => setActiveSection('accordion')}>
              Accordion
            </Text>
            <div className="component-grid">
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Default</Text>
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
                <Text preset="paragraph" className="component-card-label">Multiple Items</Text>
                <Accordion>
                  <AccordionItem value="1">
                    <AccordionTrigger>
                      First Accordion item
                    </AccordionTrigger>
                    <AccordionContent>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="2">
                    <AccordionTrigger>
                      Second Accordion item
                    </AccordionTrigger>
                    <AccordionContent>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Multiple Items (single opening)</Text>
                <Accordion multiple={false}>
                  <AccordionItem value="1">
                    <AccordionTrigger>
                      Open this
                    </AccordionTrigger>
                    <AccordionContent>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="2">
                    <AccordionTrigger>
                      Open that
                    </AccordionTrigger>
                    <AccordionContent>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Disabled</Text>
                <Accordion disabled>
                  <AccordionItem value="0">
                    <AccordionTrigger>
                      Disabled
                    </AccordionTrigger>
                    <AccordionContent>
                      Lorem ipsum dolor sit amet.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Disabled Item</Text>
                <Accordion>
                  <AccordionItem disabled
                                 value="0">
                    <AccordionTrigger>
                      Disabled
                    </AccordionTrigger>
                    <AccordionContent>
                      Lorem ipsum dolor sit amet.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="1">
                    <AccordionTrigger>
                      Second Accordion item
                    </AccordionTrigger>
                    <AccordionContent>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Caret position</Text>
                <Accordion>
                  <AccordionItem value="0">
                    <AccordionTrigger expandIconPosition="right">
                      Right caret
                    </AccordionTrigger>
                    <AccordionContent>
                      Lorem ipsum dolor sit amet.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <br/>
                <Accordion>
                  <AccordionItem value="1">
                    <AccordionTrigger expandIconPosition="left">
                      Left caret
                    </AccordionTrigger>
                    <AccordionContent>
                      Lorem ipsum dolor sit amet.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </section>
        )}

        {/* Badge Section */}
        {isComponentVisible('Badge') && (
          <section className="component-section" id="badge">
            <Text preset="heading-2" className="section-heading" onClick={() => setActiveSection('badge')}>
              Badge
            </Text>
            <div className="component-grid">
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Default</Text>
                <div className="flex-row">
                  <Badge>Badge</Badge>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Sizes</Text>
                <div className="flex-row">
                  <Badge size="sm">Small</Badge>
                  <Badge>Medium</Badge>
                  <Badge size="lg">Large</Badge>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Colors</Text>
                <div className="flex-row">
                  <Badge color="primary">Primary</Badge>
                  <Badge color="information">Information</Badge>
                  <Badge color="neutral">Neutral</Badge>
                  <Badge color="success">Success</Badge>
                  <Badge color="warning">Warning</Badge>
                  <Badge color="critical">Critical</Badge>
                  <Badge color="promotion">Promotion</Badge>
                  <Badge color="alpha">Alpha</Badge>
                  <Badge color="beta">Beta</Badge>
                  <Badge color="new">New</Badge>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">With Icons</Text>
                <div className="flex-row">
                  <Badge>
                    <Icon name="arrow-left"/>Left icon
                  </Badge>
                  <Badge>
                    <Icon name="arrow-up"/>
                  </Badge>
                  <Badge>
                    Right icon<Icon name="arrow-up"/>
                  </Badge>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Breadcrumb Section */}
        {isComponentVisible('Breadcrumb') && (
          <section className="component-section" id="breadcrumb">
            <Text preset="heading-2" className="section-heading" onClick={() => setActiveSection('breadcrumb')}>
              Breadcrumb
            </Text>
            <div className="component-grid">
              <div className="component-card full-width">
                <Text preset="paragraph" className="component-card-label">Default</Text>
                <Breadcrumb>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">
                      <Icon name="home"/>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Second itemegory</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Page</BreadcrumbLink>
                  </BreadcrumbItem>
                </Breadcrumb>
              </div>
              <div className="component-card full-width">
                <Text preset="paragraph" className="component-card-label">With Ellipsis</Text>
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
        )}

        {/* Button Section */}
        {isComponentVisible('Button') && (
          <section className="component-section" id="button">
            <Text preset="heading-2" className="section-heading" onClick={() => setActiveSection('button')}>
              Button
            </Text>
            <div className="component-grid">
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Default</Text>
                <div className="flex-row">
                  <Button>Primary</Button>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Sizes</Text>
                <div className="flex-row align-center">
                  <Button size="xs">Extra Small</Button>
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Solid Variant - Colors</Text>
                <div className="flex-row">
                  <Button color="primary">Primary</Button>
                  <Button color="information">Information</Button>
                  <Button color="neutral">Neutral</Button>
                  <Button color="success">Success</Button>
                  <Button color="warning">Warning</Button>
                  <Button color="critical">Critical</Button>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Outline Variant - Colors</Text>
                <div className="flex-row">
                  <Button color="primary" variant="outline">Primary</Button>
                  <Button color="information" variant="outline">Information</Button>
                  <Button color="neutral" variant="outline">Neutral</Button>
                  <Button color="success" variant="outline">Success</Button>
                  <Button color="warning" variant="outline">Warning</Button>
                  <Button color="critical" variant="outline">Critical</Button>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Ghost Variant - Colors</Text>
                <div className="flex-row">
                  <Button color="primary" variant="ghost">Primary</Button>
                  <Button color="information" variant="ghost">Information</Button>
                  <Button color="neutral" variant="ghost">Neutral</Button>
                  <Button color="success" variant="ghost">Success</Button>
                  <Button color="warning" variant="ghost">Warning</Button>
                  <Button color="critical" variant="ghost">Critical</Button>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Disabled</Text>
                <div className="flex-row">
                  <Button disabled>Disabled</Button>
                  <Button variant="outline" disabled>Disabled Outline</Button>
                  <Button variant="ghost" disabled>Disabled Ghost</Button>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Loading</Text>
                <div className="flex-row">
                  <Button loading>Loading</Button>
                  <Button variant="outline" loading>Loading Outline</Button>
                  <Button variant="ghost" loading>Loading Ghost</Button>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">With Icons</Text>
                <div className="flex-row">
                  <Button>
                    <Icon name="arrow-left"/>Left icon
                  </Button>
                  <Button>
                    <Icon name="xmark"/>
                  </Button>
                  <Button>
                    Right icon<Icon name="arrow-right"/>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ButtonGroup Section */}
        {isComponentVisible('ButtonGroup') && (
          <section className="component-section" id="buttongroup">
            <Text preset="heading-2" className="section-heading" onClick={() => setActiveSection('buttongroup')}>
              Button Group
            </Text>
            <div className="component-grid">
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Default</Text>
                <ButtonGroup>
                  <ButtonGroupItem value={"1"}>First</ButtonGroupItem>
                  <ButtonGroupItem value={"2"}>Second</ButtonGroupItem>
                  <ButtonGroupItem value={"3"}>Third</ButtonGroupItem>
                </ButtonGroup>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Sizes</Text>
                <ButtonGroup size="xs">
                  <ButtonGroupItem value={"1"}>Extra Small</ButtonGroupItem>
                  <ButtonGroupItem value={"2"}>Size</ButtonGroupItem>
                </ButtonGroup>
                <ButtonGroup size="sm">
                  <ButtonGroupItem value={"1"}>Small</ButtonGroupItem>
                  <ButtonGroupItem value={"2"}>Size</ButtonGroupItem>
                </ButtonGroup>
                <ButtonGroup>
                  <ButtonGroupItem value={"1"}>Medium</ButtonGroupItem>
                  <ButtonGroupItem value={"2"}>Size</ButtonGroupItem>
                </ButtonGroup>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Multiple</Text>
                <ButtonGroup multiple>
                  <ButtonGroupItem value={"1"}>First</ButtonGroupItem>
                  <ButtonGroupItem value={"2"}>Second</ButtonGroupItem>
                  <ButtonGroupItem value={"3"}>Third</ButtonGroupItem>
                </ButtonGroup>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Disabled</Text>
                <ButtonGroup disabled>
                  <ButtonGroupItem value={"1"}>First</ButtonGroupItem>
                  <ButtonGroupItem value={"2"}>Second</ButtonGroupItem>
                  <ButtonGroupItem value={"3"}>Third</ButtonGroupItem>
                </ButtonGroup>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Disabled item</Text>
                <ButtonGroup>
                  <ButtonGroupItem value={"1"} disabled>First</ButtonGroupItem>
                  <ButtonGroupItem value={"2"}>Second</ButtonGroupItem>
                  <ButtonGroupItem value={"3"}>Third</ButtonGroupItem>
                </ButtonGroup>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">With Icons</Text>
                <ButtonGroup size="xs">
                  <ButtonGroupItem value={"1"}><Icon name="arrow-left"/>Left icon</ButtonGroupItem>
                  <ButtonGroupItem value={"2"}><Icon name="arrow-up"/></ButtonGroupItem>
                  <ButtonGroupItem value={"3"}>Right icon<Icon name="arrow-right"/></ButtonGroupItem>
                </ButtonGroup>
              </div>
            </div>
          </section>
        )}

        {/* Card Section */}
        {isComponentVisible('Card') && (
          <section className="component-section" id="card">
            <Text preset="heading-2" className="section-heading" onClick={() => setActiveSection('card')}>
              Card
            </Text>
            <div className="component-grid">
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Default</Text>
                <div className="flex-row">
                  <Card>
                    Card
                  </Card>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Colors</Text>
                <div className="flex-row">
                  <Card color="primary">Primary</Card>
                  <Card color="information">Information</Card>
                  <Card color="neutral">Neutral</Card>
                  <Card color="success">Success</Card>
                  <Card color="warning">Warning</Card>
                  <Card color="critical">Critical</Card>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Checkbox Section */}
        {isComponentVisible('Checkbox') && (
          <section className="component-section" id="checkbox">
            <Text preset="heading-2" className="section-heading" onClick={() => setActiveSection('checkbox')}>
              Checkbox
            </Text>
            <div className="component-grid">
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Default</Text>
                <Checkbox>
                  <CheckboxControl/>
                  <CheckboxLabel>Checkbox</CheckboxLabel>
                </Checkbox>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">States</Text>
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
                  <Checkbox invalid>
                    <CheckboxControl/>
                    <CheckboxLabel>Invalid</CheckboxLabel>
                  </Checkbox>
                  <Checkbox invalid checked="indeterminate">
                    <CheckboxControl/>
                    <CheckboxLabel>Invalid Inderterminate</CheckboxLabel>
                  </Checkbox>
                  <Checkbox invalid checked>
                    <CheckboxControl/>
                    <CheckboxLabel>Invalid Checked</CheckboxLabel>
                  </Checkbox>
                  <Checkbox disabled>
                    <CheckboxControl/>
                    <CheckboxLabel>Disabled</CheckboxLabel>
                  </Checkbox>
                  <Checkbox disabled checked="indeterminate">
                    <CheckboxControl/>
                    <CheckboxLabel>Disabled Indeterminate</CheckboxLabel>
                  </Checkbox>
                  <Checkbox disabled checked>
                    <CheckboxControl/>
                    <CheckboxLabel>Disabled Checked</CheckboxLabel>
                  </Checkbox>
                  <Checkbox disabled invalid>
                    <CheckboxControl/>
                    <CheckboxLabel>Disabled Invalid</CheckboxLabel>
                  </Checkbox>
                  <Checkbox disabled invalid checked="indeterminate">
                    <CheckboxControl/>
                    <CheckboxLabel>Disabled Invalid Indeterminate</CheckboxLabel>
                  </Checkbox>
                  <Checkbox disabled invalid checked>
                    <CheckboxControl/>
                    <CheckboxLabel>Disabled Invalid Checked</CheckboxLabel>
                  </Checkbox>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Checkbox Group</Text>
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
        )}

        {/* Clipboard Section */}
        {isComponentVisible('Clipboard') && (
          <section className="component-section" id="clipboard">
            <Text preset="heading-2" className="section-heading" onClick={() => setActiveSection('clipboard')}>
              Clipboard
            </Text>
            <div className="component-grid">
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Default</Text>
                <div className="flex-row">
                  <Clipboard value="Clipboard">
                    <ClipboardControl/>
                    <ClipboardTrigger/>
                  </Clipboard>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">States</Text>
                <div className="flex-column">
                  <div className="flex-row">
                    <Clipboard value="Loading">
                      <ClipboardControl loading/>
                      <ClipboardTrigger/>
                    </Clipboard>
                  </div>
                  <div className="flex-row">
                    <Clipboard value="Unmasked">
                      <ClipboardControl maskOption={{
                        enable: true,
                        initialState: "open"
                      }}/>
                      <ClipboardTrigger/>
                    </Clipboard>
                  </div>
                  <div className="flex-row">
                    <Clipboard value="Masked">
                      <ClipboardControl maskOption={{enable: true}}/>
                      <ClipboardTrigger/>
                    </Clipboard>
                  </div>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Disabled</Text>
                <div className="flex-row">
                  <Clipboard disabled value="Disabled">
                    <ClipboardControl/>
                    <ClipboardTrigger/>
                  </Clipboard>
                </div>
                <div className="flex-row">
                  <Clipboard disabled value="Disabled loading">
                    <ClipboardControl loading/>
                    <ClipboardTrigger/>
                  </Clipboard>
                </div>
                <div className="flex-row">
                  <Clipboard disabled value="Disabled unmasked">
                    <ClipboardControl maskOption={{
                      enable: true,
                      initialState: "open"
                    }}/>
                    <ClipboardTrigger/>
                  </Clipboard>
                </div>
                <div className="flex-row">
                  <Clipboard disabled value="Disabled masked">
                    <ClipboardControl maskOption={{
                      enable: true
                    }}/>
                    <ClipboardTrigger/>
                  </Clipboard>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Code Section */}
        {isComponentVisible('Code') && (
          <section className="component-section" id="code">
            <Text preset="heading-2" className="section-heading" onClick={() => setActiveSection('code')}>
              Code
            </Text>
            <div className="component-grid">
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Default</Text>
                <div className="flex-row">
                  <Code>Code</Code>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">With Copy</Text>
                <div className="flex-row">
                  <Code canCopy>{`import { Text } from '@ovhcloud/ods-react';`}</Code>
                </div>
              </div>
              <div className="component-card full-width">
                <Text preset="paragraph" className="component-card-label">Multi-line (& highlight via Shiki)</Text>
                <div className="flex-row">
                  <Code canCopy
                        highlighter={{
                          language: lang,
                          theme: theme,
                        }}>
                    {`function isTargetInElement(event, element) {
  if (!element) {
    return false;
  }
  return element.contains(event.target) || event.composedPath().includes(element);
}`}
                  </Code>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Combobox Section */}
        {isComponentVisible('Combobox') && (
          <section className="component-section" id="combobox">
            <Text preset="heading-2" className="section-heading" onClick={() => setActiveSection('combobox')}>
              Combobox
            </Text>
            <div className="component-grid">
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Default</Text>
                <div className="flex-row">
                  <Combobox
                    items={[
                      {label: 'First item', value: 'item-1'},
                      {label: 'Second item', value: 'item-2'},
                      {label: 'Third item', value: 'item-3'},
                      {label: 'Fourth item', value: 'item-4'},
                    ]}
                  >
                    <ComboboxControl placeholder="Combobox"/>
                    <ComboboxContent/>
                  </Combobox>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">States</Text>
                <div className="flex-column">
                  <div className="flex-row">
                    <Combobox defaultValue={["clearable"]} items={[{label: 'Clearable', value: 'clearable'}]}>
                      <ComboboxControl clearable placeholder="Clearable"/>
                      <ComboboxContent/>
                    </Combobox>
                  </div>
                  <div className="flex-row">
                    <Combobox items={[]}>
                      <ComboboxControl placeholder="Empty"/>
                      <ComboboxContent/>
                    </Combobox>
                  </div>
                  <div className="flex-row">
                    <Combobox invalid items={[{label: 'First item', value: 'item1'}]}>
                      <ComboboxControl placeholder="Invalid"/>
                      <ComboboxContent/>
                    </Combobox>
                  </div>
                  <div className="flex-row">
                    <Combobox readOnly items={[{label: 'First item', value: 'item1'}]}>
                      <ComboboxControl placeholder="Readonly"/>
                      <ComboboxContent/>
                    </Combobox>
                  </div>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Highlight Results</Text>
                <div className="flex-row">
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
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Multiple</Text>
                <div className="flex-row">
                  <Combobox
                    multiple
                    items={[
                      {label: 'First item', value: 'item-1'},
                      {label: 'Second item', value: 'item-2'},
                      {label: 'Third item', value: 'item-3'},
                      {label: 'Fourth item', value: 'item-4'},
                    ]}
                  >
                    <ComboboxControl placeholder="Combobox"/>
                    <ComboboxContent/>
                  </Combobox>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Grouping</Text>
                <div className="flex-row">
                  <Combobox
                    items={[
                      {
                        label: 'Europe',
                        options: [
                          {
                            label: 'France',
                            value: 'fr'
                          },
                          {
                            label: 'Germany',
                            value: 'de'
                          },
                          {
                            label: 'Italy',
                            value: 'it'
                          }
                        ]
                      },
                      {
                        label: 'Asia',
                        options: [
                          {
                            label: 'China',
                            value: 'cn'
                          },
                          {
                            label: 'Japan',
                            value: 'jp'
                          },
                          {
                            label: 'Russia',
                            value: 'ru'
                          }
                        ]
                      },
                      {
                        label: 'World',
                        value: 'world'
                      }
                    ]}
                  >
                    <ComboboxControl placeholder="Combobox"/>
                    <ComboboxContent/>
                  </Combobox>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Datepicker Section */}
        {isComponentVisible('Datepicker') && (
          <section className="component-section" id="datepicker">
            <Text preset="heading-2" className="section-heading" onClick={() => setActiveSection('datepicker')}>
              Datepicker
            </Text>
            <div className="component-grid">
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Default</Text>
                <div className="flex-row">
                  <Datepicker>
                    <DatepickerControl placeholder="Datepicker"/>
                    <DatepickerContent/>
                  </Datepicker>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">States</Text>
                <div className="flex-row">
                  <Datepicker readOnly>
                    <DatepickerControl placeholder="Readonly"/>
                    <DatepickerContent/>
                  </Datepicker>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Disabled</Text>
                <div className="flex-row">
                  <Datepicker disabled>
                    <DatepickerControl placeholder="Disabled"/>
                    <DatepickerContent/>
                  </Datepicker>
                </div>
                <div className="flex-row">
                  <Datepicker
                    disabledDates={[
                      new Date(Date.now() + 86400000),
                      new Date(Date.now() + 172800000),
                      new Date(Date.now() + 259200000)
                    ]}
                  >
                    <DatepickerControl placeholder="Disabled dates"/>
                    <DatepickerContent/>
                  </Datepicker>
                </div>
                <div className="flex-row">
                  <Datepicker
                    disabledWeekDays={[
                      0,
                      3
                    ]}
                  >
                    <DatepickerControl placeholder="Disabled week days"/>
                    <DatepickerContent/>
                  </Datepicker>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Divider Section */}
        {isComponentVisible('Divider') && (
          <section className="component-section" id="divider">
            <Text preset="heading-2" className="section-heading" onClick={() => setActiveSection('divider')}>
              Divider
            </Text>
            <div className="component-grid">
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Default</Text>
                <Divider style={{width: '100%'}}/>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Spacings</Text>
                <div className="flex-column" style={{gap: '0'}}>
                  <Divider spacing="0" style={{width: '100%'}}/>
                  <Divider spacing="2" style={{width: '100%'}}/>
                  <Divider spacing="4" style={{width: '100%'}}/>
                  <Divider spacing="6" style={{width: '100%'}}/>
                  <Divider spacing="8" style={{width: '100%'}}/>
                  <Divider spacing="12" style={{width: '100%'}}/>
                  <Divider spacing="16" style={{width: '100%'}}/>
                  <Divider spacing="24" style={{width: '100%'}}/>
                  <Divider spacing="32" style={{width: '100%'}}/>
                  <Divider spacing="40" style={{width: '100%'}}/>
                  <Divider spacing="48" style={{width: '100%'}}/>
                  <Divider spacing="64" style={{width: '100%'}}/>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Colors</Text>
                <div className="flex-column" style={{gap: '16px'}}>
                  <Divider style={{width: '100%'}}/>
                  <Divider color="neutral" style={{width: '100%'}}/>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Drawer Section */}
        {isComponentVisible('Drawer') && (
          <section className="component-section" id="drawer">
            <Text preset="heading-2" className="section-heading" onClick={() => setActiveSection('drawer')}>
              Drawer
            </Text>
            <div className="component-grid">
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Default</Text>
                <Drawer>
                  <DrawerTrigger asChild>
                    <div className="flex-row">
                      <Button>Open Drawer</Button>
                    </div>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerBody>
                      <Text preset="heading-4" as="div">Drawer Content</Text>
                      <Text preset="paragraph">This is the drawer body content.</Text>
                    </DrawerBody>
                  </DrawerContent>
                </Drawer>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Positions</Text>
                <div className="flex-row">
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button variant="outline">Left</Button>
                    </DrawerTrigger>
                    <DrawerContent position={DRAWER_POSITION.left}>
                      <DrawerBody>Left drawer content</DrawerBody>
                    </DrawerContent>
                  </Drawer>
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button variant="outline">Right</Button>
                    </DrawerTrigger>
                    <DrawerContent position={DRAWER_POSITION.right}>
                      <DrawerBody>
                        <Text preset="heading-4" as="div">Drawer Content</Text>
                        <Text preset="paragraph">This is the drawer body content.</Text>
                      </DrawerBody>
                    </DrawerContent>
                  </Drawer>
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button variant="outline">Top</Button>
                    </DrawerTrigger>
                    <DrawerContent position={DRAWER_POSITION.top}>
                      <DrawerBody>Top drawer content</DrawerBody>
                    </DrawerContent>
                  </Drawer>
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button variant="outline">Bottom</Button>
                    </DrawerTrigger>
                    <DrawerContent position={DRAWER_POSITION.bottom}>
                      <DrawerBody>Bottom drawer content</DrawerBody>
                    </DrawerContent>
                  </Drawer>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Editable Section */}
        {isComponentVisible('Editable') && (
          <section className="component-section" id="editable">
            <Text preset="heading-2" className="section-heading" onClick={() => setActiveSection('editable')}>
              Editable
            </Text>
            <div className="component-grid">
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Default</Text>
                <Editable>
                  <EditableDisplay>
                    <EditableDisplayEmpty>Editable</EditableDisplayEmpty>
                  </EditableDisplay>

                  <EditableInput>
                    <Input autoFocus/>
                  </EditableInput>

                  <EditableActions/>
                </Editable>
              </div>
            </div>
          </section>
        )}

        {/* FileUpload Section */}
        {isComponentVisible('FileUpload') && (
          <section className="component-section" id="fileupload">
            <Text preset="heading-2" className="section-heading" onClick={() => setActiveSection('fileupload')}>
              FileUpload
            </Text>
            <div className="component-grid">
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Default</Text>
                <FileUpload>
                  <FileUploadList/>
                </FileUpload>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Compact variant</Text>
                <FileUpload variant="compact">
                  <FileUploadList/>
                </FileUpload>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Disabled</Text>
                <FileUpload disabled>
                  <FileUploadList/>
                </FileUpload>
                <FileUpload disabled variant="compact">
                  <FileUploadList/>
                </FileUpload>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">With Constraints</Text>
                <FileUpload
                  acceptedFileLabel="Formats acceptés : images"
                  dropzoneLabel="Glisser-déposer des fichiers"
                  maxFile={3}
                  maxFileLabel="Nombre maximal de fichiers :"
                  maxSize={524288000}
                  maxSizeLabel="Taille de fichier max :"
                  variant="compact"
                >
                  <FileUploadList/>
                </FileUpload>
              </div>
            </div>
          </section>
        )}

        {/* FormField Section */}
        {isComponentVisible('FormField') && (
          <section className="component-section" id="formfield">
            <Text preset="heading-2" className="section-heading" onClick={() => setActiveSection('formfield')}>
              FormField
            </Text>
            <div className="component-grid">
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Default</Text>
                <FormField>
                  <FormFieldLabel>Label</FormFieldLabel>
                  <div className="flex-row">
                    <Input placeholder="Field"/>
                  </div>
                </FormField>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Default</Text><FormField>
                <FormFieldLabel>
                  Label
                  <FormFieldLabelSubLabel>
                    - mandatory
                  </FormFieldLabelSubLabel>
                </FormFieldLabel>
                <div className="flex-row">
                  <Input placeholder="Field"/>
                </div>
              </FormField>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">With Helper</Text>
                <FormField>
                  <FormFieldLabel>Label</FormFieldLabel>
                  <div className="flex-row">
                    <Input placeholder="Field"/>
                  </div>
                  <FormFieldHelper>Field helper</FormFieldHelper>
                </FormField>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">With Error</Text>
                <FormField invalid>
                  <FormFieldLabel>Label</FormFieldLabel>
                  <div className="flex-row">
                    <Input placeholder="Field"/>
                  </div>
                  <FormFieldError>Field Error</FormFieldError>
                </FormField>
              </div>
            </div>
          </section>
        )}

        {/* Icon Section */}
        {isComponentVisible('Icon') && (
          <section className="component-section" id="icon">
            <Text preset="heading-2" className="section-heading" onClick={() => setActiveSection('icon')}>
              Icon
            </Text>
            <div className="component-grid">
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Default</Text>
                <Icon name="home"/>
              </div>
              <div className="component-card full-width">
                <Text preset="paragraph" className="component-card-label">Common Icons</Text>
                <div className="flex-row" style={{gap: '0'}}>
                  {Object.values(ICON_NAME).map((iconName) => (
                    <Icon name={iconName as ICON_NAME} className={'icon-' + iconName}/>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Input Section */}
        {isComponentVisible('Input') && (
          <section className="component-section" id="input">
            <Text preset="heading-2" className="section-heading" onClick={() => setActiveSection('input')}>
              Input
            </Text>
            <div className="component-grid">
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Default</Text>
                <div className="flex-row">
                  <Input placeholder="Input"/>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Types</Text>
                <div className="flex-column">
                  <div className="flex-row">
                    <Input placeholder="Email input" type="email"/>
                  </div>
                  <div className="flex-row">
                    <Input placeholder="Number input" type="number"/>
                  </div>
                  <div className="flex-row">
                    <Input placeholder="Text input" type="password"/>
                  </div>
                  <div className="flex-row">
                    <Input placeholder="Search input" type="search"/>
                  </div>
                  <div className="flex-row">
                    <Input placeholder="Time input" type="time"/>
                  </div>
                  <div className="flex-row">
                    <Input placeholder="URL input" type="url"/>
                  </div>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">States</Text>
                <div className="flex-column">
                  <div className="flex-row">
                    <Input defaultValue="Clearable" clearable/>
                  </div>
                  <div className="flex-row">
                    <Input defaultValue="Readonly" readOnly/>
                  </div>
                  <div className="flex-row">
                    <Input placeholder="Loading" loading/>
                  </div>
                  <div className="flex-row">
                    <Input value="Unmasked"
                           maskOption={{
                             enable: true,
                             initialState: "open"
                           }}
                    />
                  </div>
                  <div className="flex-row">
                    <Input value="Masked"
                           maskOption={{
                             enable: true
                           }}
                    />
                  </div>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Disabled</Text>
                <div className="flex-column">
                  <div className="flex-row">
                    <Input disabled defaultValue="Disabled"/>
                  </div>
                  <div className="flex-row">
                    <Input disabled defaultValue="Disabled Clearable" clearable/>
                  </div>
                  <div className="flex-row">
                    <Input disabled defaultValue="Disabled Readonly" readOnly/>
                  </div>
                  <div className="flex-row">
                    <Input disabled placeholder="Disabled Loading" loading/>
                  </div>
                  <div className="flex-row">
                    <Input value="Disabled Unmasked"
                           disabled
                           maskOption={{
                             enable: true,
                             initialState: "open"
                           }}
                    />
                  </div>
                  <div className="flex-row">
                    <Input value="Disabled Masked"
                           disabled
                           maskOption={{
                             enable: true
                           }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Kbd Section */}
        {isComponentVisible('Kbd') && (
          <section className="component-section" id="kbd">
            <Text preset="heading-2" className="section-heading" onClick={() => setActiveSection('kbd')}>
              Kbd
            </Text>
            <div className="component-grid">
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Default</Text>
                <div className="flex-row">
                  <Kbd>Ctrl</Kbd>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Link Section */}
        {isComponentVisible('Link') && (
          <section className="component-section" id="link">
            <Text preset="heading-2" className="section-heading" onClick={() => setActiveSection('link')}>
              Link
            </Text>
            <div className="component-grid">
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Default</Text>
                <div className="flex-row">
                  <Link href="https://www.ovhcloud.com">Link</Link>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Disabled</Text>
                <div className="flex-row">
                  <Link href="https://www.ovhcloud.com" disabled>Disabled</Link>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">With Icons</Text>
                <div className="flex-row">
                  <Link href="https://www.ovhcloud.com">
                    <Icon name="arrow-left"/>Left icon
                  </Link>
                  <Link href="https://www.ovhcloud.com">
                    <Icon name="arrow-up"/>
                  </Link>
                  <Link href="https://www.ovhcloud.com" target="_blank">
                    Right icon<Icon name="arrow-right"/>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Logo Section */}
        {isComponentVisible('Logo') && (
          <section className="component-section" id="logo">
            <Text preset="heading-2" className="section-heading" onClick={() => setActiveSection('logo')}>
              Logo
            </Text>
            <div className="component-grid">
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Default</Text>
                <div className="flex-row">
                  <Logo/>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Sizes</Text>
                <div className="flex-row">
                  <Logo size="sm"/>
                </div>
                <div className="flex-row">
                  <Logo/>
                </div>
                <div className="flex-row">
                  <Logo size="lg"/>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Variants</Text>
                <div className="flex-row">
                  <Logo variant="emblem"/>
                </div>
                <div className="flex-row">
                  <Logo/>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Medium Section */}
        {isComponentVisible('Medium') && (
          <section className="component-section" id="medium">
            <Text preset="heading-2" className="section-heading" onClick={() => setActiveSection('medium')}>
              Medium
            </Text>
            <div className="component-grid">
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Default</Text>
                <Medium
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b9/NASAComputerRoom7090.NARA.jpg"
                />
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Height</Text>
                <div className="flex-row">
                  <Medium
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b9/NASAComputerRoom7090.NARA.jpg"
                    height={100}
                  />
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Width</Text>
                <div className="flex-row">
                  <Medium
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b9/NASAComputerRoom7090.NARA.jpg"
                    width={100}
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Message Section */}
        {isComponentVisible('Message') && (
          <section className="component-section" id="message">
            <Text preset="heading-2" className="section-heading" onClick={() => setActiveSection('message')}>
              Message
            </Text>
            <div className="component-grid">
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Default</Text>
                <div className="flex-row">
                  <Message>
                    <MessageBody>Message</MessageBody>
                  </Message>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Solid variant - Colors</Text>
                <div className="flex-column">
                  <div className="flex-row">
                    <Message color="primary">
                      <MessageIcon name="home"/>
                      <MessageBody>Primary Message</MessageBody>
                    </Message>
                  </div>
                  <div className="flex-row">
                    <Message color="information">
                      <MessageIcon name="circle-info"/>
                      <MessageBody>Information Message</MessageBody>
                    </Message>
                  </div>
                  <div className="flex-row">
                    <Message color="neutral">
                      <MessageIcon name="email"/>
                      <MessageBody>Neutral Message</MessageBody>
                    </Message>
                  </div>
                  <div className="flex-row">
                    <Message color="success">
                      <MessageIcon name="circle-check"/>
                      <MessageBody>Success Message</MessageBody>
                    </Message>
                  </div>
                  <div className="flex-row">
                    <Message color="warning">
                      <MessageIcon name="triangle-exclamation"/>
                      <MessageBody>Warning Message</MessageBody>
                    </Message>
                  </div>
                  <div className="flex-row">
                    <Message color="critical">
                      <MessageIcon name="hexagon-exclamation"/>
                      <MessageBody>Critical Message</MessageBody>
                    </Message>
                  </div>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Light variant - Colors</Text>
                <div className="flex-column">
                  <div className="flex-row">
                    <Message variant="light" color="primary">
                      <MessageIcon name="home"/>
                      <MessageBody>Primary Message</MessageBody>
                    </Message>
                  </div>
                  <div className="flex-row">
                    <Message variant="light" color="information">
                      <MessageIcon name="circle-info"/>
                      <MessageBody>Information Message</MessageBody>
                    </Message>
                  </div>
                  <div className="flex-row">
                    <Message variant="light" color="neutral">
                      <MessageIcon name="email"/>
                      <MessageBody>Neutral Message</MessageBody>
                    </Message>
                  </div>
                  <div className="flex-row">
                    <Message variant="light" color="success">
                      <MessageIcon name="circle-check"/>
                      <MessageBody>Success Message</MessageBody>
                    </Message>
                  </div>
                  <div className="flex-row">
                    <Message variant="light" color="warning">
                      <MessageIcon name="triangle-exclamation"/>
                      <MessageBody>Warning Message</MessageBody>
                    </Message>
                  </div>
                  <div className="flex-row">
                    <Message variant="light" color="critical">
                      <MessageIcon name="hexagon-exclamation"/>
                      <MessageBody>Critical Message</MessageBody>
                    </Message>
                  </div>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Non-dismissable</Text>
                <div className="flex-row">
                  <Message dismissible={false}>
                    <MessageBody>Message</MessageBody>
                  </Message>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Meter Section */}
        {isComponentVisible('Meter') && (
          <section className="component-section" id="meter">
            <Text preset="heading-2" className="section-heading" onClick={() => setActiveSection('meter')}>
              Meter
            </Text>
            <div className="component-grid">
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Default</Text>
                <Meter value={50} max={100}/>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Colors</Text>
                <div className="flex-column" style={{gap: '16px'}}>
                  <Meter
                    high={80}
                    low={40}
                    optimum={50}
                    value={50}
                  />
                  <Meter
                    high={80}
                    low={40}
                    optimum={30}
                    value={50}
                  />
                  <Meter
                    high={20}
                    low={50}
                    optimum={40}
                    value={50}
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Modal Section */}
        {isComponentVisible('Modal') && (
          <section className="component-section" id="modal">
            <Text preset="heading-2" className="section-heading" onClick={() => setActiveSection('modal')}>Modal</Text>
            <div className="component-grid">
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Default</Text>
                <div className="flex-row">
                  <Modal>
                    <ModalTrigger asChild>
                      <Button>Open Modal</Button>
                    </ModalTrigger>
                    <ModalContent>
                      <ModalHeader>
                        Modal Title
                      </ModalHeader>
                      <ModalBody>
                        This is the modal content.
                      </ModalBody>
                    </ModalContent>
                  </Modal>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Colors</Text>
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
                </div>
                <div className="flex-row">
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
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Non-dismissable</Text>
                <div className="flex-row">
                  <Modal>
                    <ModalTrigger asChild>
                      <Button>
                        Non-dismissable Modal
                      </Button>
                    </ModalTrigger>

                    <ModalContent dismissible={false}>
                      <ModalHeader>Non dismissible</ModalHeader>
                      <ModalBody>
                        My modal content
                      </ModalBody>
                    </ModalContent>
                  </Modal>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Non-escapable</Text>
                <div className="flex-row">
                  <Modal closeOnEscape={false} closeOnInteractOutside={false}>
                    <ModalTrigger asChild>
                      <Button>
                        Non-escapable Modal
                      </Button>
                    </ModalTrigger>

                    <ModalContent>
                      <ModalHeader>Non escapable</ModalHeader>
                      <ModalBody>
                        My modal content
                      </ModalBody>
                    </ModalContent>
                  </Modal>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Pagination Section */}
        {isComponentVisible('Pagination') && (
          <section className="component-section" id="pagination">
            <Text preset="heading-2" className="section-heading"
                  onClick={() => setActiveSection('pagination')}>Pagination</Text>
            <div className="component-grid">
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Default</Text>
                <Pagination totalItems={30}/>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Disabled</Text>
                <Pagination disabled totalItems={30}/>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">With ellipsis</Text>
                <Pagination
                  defaultPage={1}
                  siblingCount={0}
                  totalItems={50}
                />
                <Pagination
                  defaultPage={3}
                  siblingCount={0}
                  totalItems={50}
                />
                <Pagination
                  defaultPage={5}
                  siblingCount={0}
                  totalItems={50}
                />
              </div>
              <div className="component-card full-width">
                <Text preset="paragraph" className="component-card-label">With Page Size Selector</Text>
                <Pagination
                  totalItems={500}
                  withPageSizeSelector
                  renderTotalItemsLabel={({totalItems}) => `of ${totalItems} results`}
                />
              </div>
            </div>
          </section>
        )}

        {/* Password Section */}
        {isComponentVisible('Password') && (
          <section className="component-section" id="password">
            <Text preset="heading-2" className="section-heading" onClick={() => setActiveSection('password')}>
              Password
            </Text>
            <div className="component-grid">
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Default</Text>
                <div className="flex-row">
                  <Password value="Password" placeholder="Password"/>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">States</Text>
                <div className="flex-column">
                  <div className="flex-row">
                    <Password defaultValue="Unmasked"
                              maskInitialState="open"
                    />
                  </div>
                  <div className="flex-row">
                    <Password defaultValue="Clearable"
                              clearable
                              maskInitialState="open"
                    />
                  </div>
                  <div className="flex-row">
                    <Password defaultValue="Readonly"
                              readOnly
                              maskInitialState="open"
                    />
                  </div>
                  <div className="flex-row">
                    <Password defaultValue="Loading"
                              loading
                              maskInitialState="open"
                    />
                  </div>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Disabled</Text>
                <div className="flex-column">
                  <div className="flex-row">
                    <Password defaultValue="Disabled Unmasked"
                              disabled
                              maskInitialState="open"
                    />
                  </div>
                  <div className="flex-row">
                    <Password defaultValue="Disabled Masked"
                              disabled
                    />
                  </div>
                  <div className="flex-row">
                    <Password defaultValue="Disabled Clearable"
                              disabled
                              clearable
                              maskInitialState="open"
                    />
                  </div>
                  <div className="flex-row">
                    <Password defaultValue="Disabled Readonly"
                              disabled
                              readOnly
                              maskInitialState="open"
                    />
                  </div>
                  <div className="flex-row">
                    <Password defaultValue="Disabled Loading"
                              disabled
                              loading
                              maskInitialState="open"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* PhoneNumber Section */}
        {isComponentVisible('PhoneNumber') && (
          <section className="component-section" id="phonenumber">
            <Text preset="heading-2" className="section-heading" onClick={() => setActiveSection('phonenumber')}>
              Phone Number
            </Text>
            <div className="component-grid">
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Default</Text>
                <PhoneNumber>
                  <PhoneNumberControl/>
                </PhoneNumber>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">With country list</Text>
                <PhoneNumber country="fr">
                  <PhoneNumberCountryList/>
                  <PhoneNumberControl/>
                </PhoneNumber>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">With locales</Text>
                <PhoneNumber locale="pl"
                             country="pl">
                  <PhoneNumberCountryList/>
                  <PhoneNumberControl/>
                </PhoneNumber>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">States</Text>
                <PhoneNumber defaultValue="+33612345678"
                             country="fr">
                  <PhoneNumberCountryList/>
                  <PhoneNumberControl clearable/>
                </PhoneNumber>
                <PhoneNumber defaultValue="+33612345678"
                             country="fr"
                             readOnly>
                  <PhoneNumberCountryList/>
                  <PhoneNumberControl/>
                </PhoneNumber>
                <PhoneNumber defaultValue="+33612345678"
                             country="fr">
                  <PhoneNumberCountryList/>
                  <PhoneNumberControl loading/>
                </PhoneNumber>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Disabled</Text>
                <PhoneNumber disabled>
                  <PhoneNumberCountryList/>
                  <PhoneNumberControl/>
                </PhoneNumber>
                <PhoneNumber defaultValue="+33612345678"
                             country="fr"
                             disabled>
                  <PhoneNumberCountryList/>
                  <PhoneNumberControl clearable/>
                </PhoneNumber>
                <PhoneNumber defaultValue="+33612345678"
                             country="fr"
                             readOnly
                             disabled>
                  <PhoneNumberCountryList/>
                  <PhoneNumberControl/>
                </PhoneNumber>
                <PhoneNumber defaultValue="+33612345678"
                             country="fr"
                             disabled>
                  <PhoneNumberCountryList/>
                  <PhoneNumberControl loading/>
                </PhoneNumber>
              </div>
            </div>
          </section>
        )}

        {/* Popover Section */}
        {isComponentVisible('Popover') && (
          <section className="component-section" id="popover">
            <Text preset="heading-2" className="section-heading" onClick={() => setActiveSection('popover')}>
              Popover
            </Text>
            <div className="component-grid">
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Default</Text>
                <div className="flex-row">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button>Show Popover</Button>
                    </PopoverTrigger>
                    <PopoverContent withArrow>
                      <Text preset="paragraph">This is popover content</Text>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Positions</Text>
                <div className="flex-row">
                  <Popover position="top-start">
                    <PopoverTrigger style={{flex: '1 1'}} asChild>
                      <Button variant="outline" size="sm">Top Start</Button>
                    </PopoverTrigger>
                    <PopoverContent withArrow>Top start popover</PopoverContent>
                  </Popover>
                  <Popover position="top">
                    <PopoverTrigger style={{flex: '1 1'}} asChild>
                      <Button variant="outline" size="sm">Top</Button>
                    </PopoverTrigger>
                    <PopoverContent withArrow>Top popover</PopoverContent>
                  </Popover>
                  <Popover position="top-end">
                    <PopoverTrigger style={{flex: '1 1'}} asChild>
                      <Button variant="outline" size="sm">Top End</Button>
                    </PopoverTrigger>
                    <PopoverContent withArrow>Top end popover</PopoverContent>
                  </Popover>
                </div>
                <div className="flex-row">
                  <Popover position="left">
                    <PopoverTrigger style={{flex: '1 1'}} asChild>
                      <Button variant="outline" size="sm">Left</Button>
                    </PopoverTrigger>
                    <PopoverContent withArrow>Left popover</PopoverContent>
                  </Popover>
                  <Popover>
                    <PopoverTrigger style={{flex: '1 1'}} asChild>
                      <Button variant="outline" size="sm">Auto</Button>
                    </PopoverTrigger>
                    <PopoverContent withArrow>Auto popover</PopoverContent>
                  </Popover>
                  <Popover position="right">
                    <PopoverTrigger style={{flex: '1 1'}} asChild>
                      <Button variant="outline" size="sm">Right</Button>
                    </PopoverTrigger>
                    <PopoverContent withArrow>Right popover</PopoverContent>
                  </Popover>
                </div>
                <div className="flex-row">
                  <Popover position="bottom-start">
                    <PopoverTrigger style={{flex: '1 1'}} asChild>
                      <Button variant="outline" size="sm">Bottom Start</Button>
                    </PopoverTrigger>
                    <PopoverContent withArrow>Bottom start popover</PopoverContent>
                  </Popover>
                  <Popover position="bottom">
                    <PopoverTrigger style={{flex: '1 1'}} asChild>
                      <Button variant="outline" size="sm">Bottom</Button>
                    </PopoverTrigger>
                    <PopoverContent withArrow>Bottom popover</PopoverContent>
                  </Popover>
                  <Popover position="bottom-end">
                    <PopoverTrigger style={{flex: '1 1'}} asChild>
                      <Button variant="outline" size="sm">Bottom End</Button>
                    </PopoverTrigger>
                    <PopoverContent withArrow>Bottom end popover</PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ProgressBar Section */}
        {isComponentVisible('ProgressBar') && (
          <section className="component-section" id="progressbar">
            <Text preset="heading-2" className="section-heading" onClick={() => setActiveSection('progressbar')}>
              Progress Bar
            </Text>
            <div className="component-grid">
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Default</Text>
                <ProgressBar value="50"/>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Values</Text>
                <div className="flex-column">
                  <ProgressBar/>
                  <ProgressBar value="25"/>
                  <ProgressBar value="50"/>
                  <ProgressBar value="75"/>
                  <ProgressBar value="100"/>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Quantity Section */}
        {isComponentVisible('Quantity') && (
          <section className="component-section" id="quantity">
            <Text preset="heading-2" className="section-heading" onClick={() => setActiveSection('quantity')}>
              Quantity
            </Text>
            <div className="component-grid">
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Default</Text>
                <Quantity>
                  <QuantityControl>
                    <QuantityInput/>
                  </QuantityControl>
                </Quantity>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">States</Text>
                <Quantity min={0}>
                  <QuantityControl>
                    <QuantityInput/>
                  </QuantityControl>
                </Quantity>
                <Quantity max={0}>
                  <QuantityControl>
                    <QuantityInput/>
                  </QuantityControl>
                </Quantity>
                <Quantity min={0} max={0}>
                  <QuantityControl>
                    <QuantityInput/>
                  </QuantityControl>
                </Quantity>
                <Quantity readOnly>
                  <QuantityControl>
                    <QuantityInput/>
                  </QuantityControl>
                </Quantity>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Disabled</Text>
                <Quantity min={0} disabled>
                  <QuantityControl>
                    <QuantityInput/>
                  </QuantityControl>
                </Quantity>
                <Quantity max={0} disabled>
                  <QuantityControl>
                    <QuantityInput/>
                  </QuantityControl>
                </Quantity>
                <Quantity min={0} max={0} disabled>
                  <QuantityControl>
                    <QuantityInput/>
                  </QuantityControl>
                </Quantity>
                <Quantity readOnly disabled>
                  <QuantityControl>
                    <QuantityInput/>
                  </QuantityControl>
                </Quantity>
              </div>
            </div>
          </section>
        )}

        {/* RadioGroup Section */}
        {isComponentVisible('RadioGroup') && (
          <section className="component-section" id="radiogroup">
            <Text preset="heading-2" className="section-heading" onClick={() => setActiveSection('radiogroup')}>
              Radio Group
            </Text>
            <div className="component-grid">
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Default</Text>
                <RadioGroup defaultValue="option1">
                  <Radio value="option1">
                    <RadioControl/>
                    <RadioLabel>Option 1</RadioLabel>
                  </Radio>
                  <Radio value="option2">
                    <RadioControl/>
                    <RadioLabel>Option 2</RadioLabel>
                  </Radio>
                </RadioGroup>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Horizontal</Text>
                <RadioGroup orientation="horizontal" defaultValue="option1">
                  <Radio value="option1">
                    <RadioControl/>
                    <RadioLabel>Option 1</RadioLabel>
                  </Radio>
                  <Radio value="option2">
                    <RadioControl/>
                    <RadioLabel>Option 2</RadioLabel>
                  </Radio>
                </RadioGroup>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">States</Text>
                <RadioGroup>
                  <Radio value="option1">
                    <RadioControl/>
                    <RadioLabel>Unchecked</RadioLabel>
                  </Radio>
                </RadioGroup>
                <RadioGroup defaultValue="option1">
                  <Radio value="option1">
                    <RadioControl/>
                    <RadioLabel>Checked</RadioLabel>
                  </Radio>
                </RadioGroup>
                <RadioGroup>
                  <Radio value="option1" invalid>
                    <RadioControl/>
                    <RadioLabel>Invalid</RadioLabel>
                  </Radio>
                </RadioGroup>
                <RadioGroup defaultValue="option1">
                  <Radio value="option1" invalid>
                    <RadioControl/>
                    <RadioLabel>Invalid Checked</RadioLabel>
                  </Radio>
                </RadioGroup>
                <RadioGroup>
                  <Radio value="option1" disabled>
                    <RadioControl/>
                    <RadioLabel>Disabled</RadioLabel>
                  </Radio>
                </RadioGroup>
                <RadioGroup defaultValue="option1">
                  <Radio value="option1" disabled>
                    <RadioControl/>
                    <RadioLabel>Disabled Checked</RadioLabel>
                  </Radio>
                </RadioGroup>
                <RadioGroup>
                  <Radio value="option1" disabled invalid>
                    <RadioControl/>
                    <RadioLabel>Disabled Invalid</RadioLabel>
                  </Radio>
                </RadioGroup>
                <RadioGroup defaultValue="option1">
                  <Radio value="option1" disabled invalid>
                    <RadioControl/>
                    <RadioLabel>Disabled Invalid Checked</RadioLabel>
                  </Radio>
                </RadioGroup>
              </div>
            </div>
          </section>
        )}

        {/* Range Section */}
        {isComponentVisible('Range') && (
          <section className="component-section" id="range">
            <Text preset="heading-2" className="section-heading" onClick={() => setActiveSection('range')}>
              Range
            </Text>
            <div className="component-grid">
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Default</Text>
                <Range defaultValue={[50]}/>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Dual Range</Text>
                <Range defaultValue={[25, 75]}/>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">With Ticks</Text>
                <Range defaultValue={[42]} ticks={[0, 25, 50, 75, 100]}/>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Custom Ticks</Text>
                <Range displayBounds={false} displayTooltip={false} max={5} min={1} defaultValue={[5]} ticks={[{
                  label: 'Very Poor',
                  value: 1
                }, {
                  label: 'Poor',
                  value: 2
                }, {
                  label: 'Average',
                  value: 3
                }, {
                  label: 'Good',
                  value: 4
                }, {
                  label: 'Excellent',
                  value: 5
                }]}/>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Without bounds</Text>
                <Range displayBounds={false} defaultValue={[50]}/>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">States</Text>
                <Range defaultValue={[50]} invalid/>
                <Range defaultValue={[50]} disabled/>
              </div>
            </div>
          </section>
        )}

        {/* Select Section */}
        {isComponentVisible('Select') && (
          <section className="component-section" id="select">
            <Text preset="heading-2" className="section-heading" onClick={() => setActiveSection('select')}>
              Select
            </Text>
            <div className="component-grid">
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Default</Text>
                <div className="flex-row">
                  <Select
                    items={[
                      {label: 'First item', value: '1'},
                      {label: 'Second item', value: '2'},
                      {label: 'Third item', value: '3'},
                    ]}
                  >
                    <SelectControl placeholder="Select"/>
                    <SelectContent/>
                  </Select>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Grouped</Text>
                <div className="flex-row">
                  <Select
                    items={[
                      {
                        label: 'Europe',
                        options: [
                          {
                            label: 'France',
                            value: 'fr'
                          },
                          {
                            label: 'Germany',
                            value: 'de'
                          },
                          {
                            label: 'Italy',
                            value: 'it'
                          }
                        ]
                      },
                      {
                        label: 'Asia',
                        options: [
                          {
                            label: 'China',
                            value: 'cn'
                          },
                          {
                            label: 'Japan',
                            value: 'jp'
                          },
                          {
                            label: 'Russia',
                            value: 'ru'
                          }
                        ]
                      },
                      {
                        label: 'World',
                        value: 'world'
                      }
                    ]}
                  >
                    <SelectControl placeholder="Select country"/>
                    <SelectContent/>
                  </Select>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Multiple selection</Text>
                <div className="flex-row">
                  <Select
                    multiple
                    defaultValue={['1', '2']}
                    items={[
                      {label: 'First item', value: '1'},
                      {label: 'Second item', value: '2'},
                      {label: 'Third item', value: '3'},
                    ]}
                  >
                    <SelectControl placeholder="Select (described)"/>
                    <SelectContent/>
                  </Select>
                </div>
                <div className="flex-row">
                  <Select
                    multiple="merge"
                    defaultValue={['1', '2']}
                    items={[
                      {label: 'First item', value: '1'},
                      {label: 'Second item', value: '2'},
                      {label: 'Third item', value: '3'},
                    ]}
                  >
                    <SelectControl placeholder="Select (as amount)"/>
                    <SelectContent/>
                  </Select>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">States</Text>
                <div className="flex-row">
                  <Select
                    items={[
                      {label: 'First item', value: '1'},
                      {label: 'Second item', value: '2'},
                      {label: 'Third item', value: '3'},
                    ]}
                    readOnly>
                    <SelectControl placeholder="Readonly"/>
                    <SelectContent/>
                  </Select>
                </div>
                <div className="flex-row">
                  <Select
                    items={[
                      {label: 'First item', value: '1'},
                      {label: 'Second item', value: '2'},
                      {label: 'Third item', value: '3'},
                    ]}
                    invalid>
                    <SelectControl placeholder="Invalid"/>
                    <SelectContent/>
                  </Select>
                </div>
                <div className="flex-row">
                  <Select
                    items={[
                      {label: 'First item', value: '1'},
                      {label: 'Second item', value: '2'},
                      {label: 'Third item', value: '3'},
                    ]}
                    readOnly
                    invalid>
                    <SelectControl placeholder="Readonly Invalid"/>
                    <SelectContent/>
                  </Select>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Disabled</Text>
                <div className="flex-row">
                  <Select
                    items={[
                      {label: 'First item', value: '1'},
                      {label: 'Second item', value: '2'},
                      {label: 'Third item', value: '3'},
                    ]}
                    disabled>
                    <SelectControl placeholder="Disabled"/>
                    <SelectContent/>
                  </Select>
                </div>
                <div className="flex-row">
                  <Select
                    items={[
                      {label: 'First item', value: '1'},
                      {disabled: true, label: 'Second item', value: '2'},
                      {label: 'Third item', value: '3'},
                    ]}>
                    <SelectControl placeholder="Disabled option"/>
                    <SelectContent/>
                  </Select>
                </div>
                <div className="flex-row">
                  <Select
                    items={[
                      {
                        label: 'Europe',
                        options: [
                          {
                            label: 'France',
                            value: 'fr'
                          },
                          {
                            label: 'Germany',
                            value: 'de'
                          },
                          {
                            label: 'Italy',
                            value: 'it'
                          }
                        ]
                      },
                      {
                        label: 'Asia',
                        disabled: true,
                        options: [
                          {
                            disabled: true,
                            label: 'China',
                            value: 'cn'
                          },
                          {
                            disabled: true,
                            label: 'Japan',
                            value: 'jp'
                          },
                          {
                            disabled: true,
                            label: 'Russia',
                            value: 'ru'
                          }
                        ]
                      },
                      {
                        label: 'World',
                        value: 'world'
                      }
                    ]}>
                    <SelectControl placeholder="Disabled group"/>
                    <SelectContent/>
                  </Select>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Skeleton Section */}
        {isComponentVisible('Skeleton') && (
          <section className="component-section" id="skeleton">
            <Text preset="heading-2" className="section-heading" onClick={() => setActiveSection('skeleton')}>
              Skeleton
            </Text>
            <div className="component-grid">
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Default</Text>
                <div aria-busy="true" className="flex-column">
                  <Skeleton/>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Spinner Section */}
        {isComponentVisible('Spinner') && (
          <section className="component-section" id="spinner">
            <Text preset="heading-2" className="section-heading" onClick={() => setActiveSection('spinner')}>
              Spinner
            </Text>
            <div className="component-grid">
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Default</Text>
                <Spinner/>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Colors</Text>
                <div className="flex-row align-center">
                  <Spinner color="primary"/>
                  <Spinner color="neutral"/>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Sizes</Text>
                <div className="flex-row align-center">
                  <Spinner size="xs"/>
                  <Spinner size="sm"/>
                  <Spinner size="md"/>
                  <Spinner size="lg"/>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Table Section */}
        {isComponentVisible('Table') && (
          <section className="component-section" id="table">
            <Text preset="heading-2" className="section-heading" onClick={() => setActiveSection('table')}>
              Table
            </Text>
            <div className="component-grid">
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Default</Text>
                <Table>
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
                    <th scope="row">Alice</th>
                    <td>Developer</td>
                    <td>Active</td>
                  </tr>
                  </tbody>
                </Table>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Sizes</Text>
                <Table size="sm">
                  <caption>Small</caption>
                  <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Role</th>
                    <th scope="col">Status</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <th scope="row">Alice</th>
                    <td>Developer</td>
                    <td>Active</td>
                  </tr>
                  </tbody>
                </Table>
                <Table size="md">
                  <caption>Medium</caption>
                  <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Role</th>
                    <th scope="col">Status</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <th scope="row">Alice</th>
                    <td>Developer</td>
                    <td>Active</td>
                  </tr>
                  </tbody>
                </Table>
                <Table size="lg">
                  <caption>Large</caption>
                  <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Role</th>
                    <th scope="col">Status</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <th scope="row">Alice</th>
                    <td>Developer</td>
                    <td>Active</td>
                  </tr>
                  </tbody>
                </Table>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Striped</Text>
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
        )}

        {/* Tabs Section */}
        {isComponentVisible('Tabs') && (
          <section className="component-section" id="tabs">
            <Text preset="heading-2" className="section-heading" onClick={() => setActiveSection('tabs')}>
              Tabs
            </Text>
            <div className="component-grid">
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Default</Text>
                <div className="flex-row">
                  <Tabs defaultValue="tab1">
                    <TabList>
                      <Tab value="tab1">First Tab</Tab>
                      <Tab value="tab2">Second Tab</Tab>
                      <Tab value="tab3">Third Tab</Tab>
                    </TabList>
                  </Tabs>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Switch variant</Text>
                <div className="flex-row">
                  <Tabs defaultValue="tab1"
                        variant="switch">
                    <TabList>
                      <Tab value="tab1">First Tab</Tab>
                      <Tab value="tab2">Second Tab</Tab>
                      <Tab value="tab3">Third Tab</Tab>
                    </TabList>
                  </Tabs>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Sizes</Text>
                <div className="flex-row">
                  <Tabs defaultValue="tab1"
                        size="xs">
                    <TabList>
                      <Tab value="tab1">First Tab</Tab>
                      <Tab value="tab2">Second Tab</Tab>
                      <Tab value="tab3">Third Tab</Tab>
                    </TabList>
                  </Tabs>
                </div>
                <div className="flex-row">
                  <Tabs defaultValue="tab1"
                        size="sm">
                    <TabList>
                      <Tab value="tab1">First Tab</Tab>
                      <Tab value="tab2">Second Tab</Tab>
                      <Tab value="tab3">Third Tab</Tab>
                    </TabList>
                  </Tabs>
                </div>
                <div className="flex-row">
                  <Tabs defaultValue="tab1"
                        size="md">
                    <TabList>
                      <Tab value="tab1">First Tab</Tab>
                      <Tab value="tab2">Second Tab</Tab>
                      <Tab value="tab3">Third Tab</Tab>
                    </TabList>
                  </Tabs>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Disabled Tab</Text>
                <div className="flex-row">
                  <Tabs defaultValue="tab1">
                    <TabList>
                      <Tab value="tab1">First Tab</Tab>
                      <Tab value="tab2" disabled>Second Tab</Tab>
                      <Tab value="tab3">Third Tab</Tab>
                    </TabList>
                  </Tabs>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Overflow</Text>
                <div className="flex-row">
                  <div
                    style={{
                      width: '300px'
                    }}
                  >
                    <Tabs defaultValue="tab1">
                      <TabList>
                        <Tab value="tab1">
                          Tab 1
                        </Tab>
                        <Tab value="tab2">
                          Tab 2
                        </Tab>
                        <Tab value="tab3">
                          Tab 3
                        </Tab>
                        <Tab value="tab4">
                          Tab 4
                        </Tab>
                        <Tab value="tab5">
                          Tab 5
                        </Tab>
                        <Tab value="tab6">
                          Tab 6
                        </Tab>
                        <Tab value="tab7">
                          Tab 7
                        </Tab>
                        <Tab value="tab8">
                          Tab 8
                        </Tab>
                        <Tab value="tab9">
                          Tab 9
                        </Tab>
                        <Tab value="tab10">
                          Tab 10
                        </Tab>
                      </TabList>
                    </Tabs>
                  </div>
                </div>
                <div className="flex-row">
                  <div
                    style={{
                      width: '300px'
                    }}
                  >
                    <Tabs defaultValue="tab1"
                          withArrows>
                      <TabList>
                        <Tab value="tab1">
                          Tab 1
                        </Tab>
                        <Tab value="tab2">
                          Tab 2
                        </Tab>
                        <Tab value="tab3">
                          Tab 3
                        </Tab>
                        <Tab value="tab4">
                          Tab 4
                        </Tab>
                        <Tab value="tab5">
                          Tab 5
                        </Tab>
                        <Tab value="tab6">
                          Tab 6
                        </Tab>
                        <Tab value="tab7">
                          Tab 7
                        </Tab>
                        <Tab value="tab8">
                          Tab 8
                        </Tab>
                        <Tab value="tab9">
                          Tab 9
                        </Tab>
                        <Tab value="tab10">
                          Tab 10
                        </Tab>
                      </TabList>
                    </Tabs>
                  </div>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">With content</Text>
                <div className="flex-row">
                  <Tabs defaultValue="tab1">
                    <TabList>
                      <Tab value="tab1">First Tab</Tab>
                      <Tab value="tab2">Second Tab</Tab>
                      <Tab value="tab3">Third Tab</Tab>
                    </TabList>
                    <TabContent value="tab1">
                      <Text preset="paragraph">First Tab content</Text>
                    </TabContent>
                    <TabContent value="tab2">
                      <Text preset="paragraph">Second Tab content</Text>
                    </TabContent>
                    <TabContent value="tab3">
                      <Text preset="paragraph">Third Tab content</Text>
                    </TabContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Tag Section */}
        {isComponentVisible('Tag') && (
          <section className="component-section" id="tag">
            <Text preset="heading-2" className="section-heading" onClick={() => setActiveSection('tag')}>
              Tag
            </Text>
            <div className="component-grid">
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Default</Text>
                <div className="flex-row">
                  <Tag>Tag</Tag>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Colors</Text>
                <div className="flex-row">
                  <Tag color="primary">Primary</Tag>
                  <Tag color="information">Information</Tag>
                  <Tag color="neutral">Neutral</Tag>
                  <Tag color="success">Success</Tag>
                  <Tag color="warning">Warning</Tag>
                  <Tag color="critical">Critical</Tag>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Sizes</Text>
                <div className="flex-row align-center">
                  <Tag color="primary" size="md">Medium</Tag>
                  <Tag color="primary" size="lg">Large</Tag>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Disabled</Text>
                <div className="flex-row align-center">
                  <Tag color="primary" disabled>Disabled</Tag>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Text Section */}
        {isComponentVisible('Text') && (
          <section className="component-section" id="text">
            <Text preset="heading-2" className="section-heading" onClick={() => setActiveSection('text')}>
              Text
            </Text>
            <div className="component-grid">
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Default</Text>
                <Text preset="paragraph">This is text content</Text>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Headings</Text>
                <Text preset="heading-1" as="div">Heading 1</Text>
                <Text preset="heading-2" as="div">Heading 2</Text>
                <Text preset="heading-3" as="div">Heading 3</Text>
                <Text preset="heading-4" as="div">Heading 4</Text>
                <Text preset="heading-5" as="div">Heading 5</Text>
                <Text preset="heading-6" as="div">Heading 6</Text>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Other Presets</Text>
                <div className="flex-column">
                  <Text preset="label">Label</Text>
                  <Text preset="paragraph">Paragraph</Text>
                  <Text preset="code">Code</Text>
                  <Text preset="span">Span</Text>
                  <Text preset="caption">Caption</Text>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Disabled</Text>
                <div className="flex-column">
                  <Text disabled>Disabled</Text>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Textarea Section */}
        {isComponentVisible('Textarea') && (
          <section className="component-section" id="textarea">
            <Text preset="heading-2" className="section-heading" onClick={() => setActiveSection('textarea')}>
              Textarea
            </Text>
            <div className="component-grid">
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Default</Text>
                <Textarea placeholder="Textarea"/>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">States</Text>
                <div className="flex-column">
                  <Textarea defaultValue="Readonly" readOnly/>
                  <Textarea defaultValue="Invalid" invalid/>
                  <Textarea defaultValue="Readonly Invalid" readOnly invalid/>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Disabled</Text>
                <div className="flex-column">
                  <Textarea defaultValue="Disabled" disabled/>
                  <Textarea defaultValue="Disabled Readonly" disabled readOnly/>
                  <Textarea defaultValue="Disabled Invalid" disabled invalid/>
                  <Textarea defaultValue="Disabled Readonly Invalid" disabled readOnly invalid/>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Resizable</Text>
                <Textarea placeholder="Resizable" style={{
                  resize: 'both'
                }}/>
              </div>
            </div>
          </section>
        )}

        {/* Tile Section */}
        {isComponentVisible('Tile') && (
          <section className="component-section" id="tile">
            <Text preset="heading-2" className="section-heading" onClick={() => setActiveSection('tile')}>
              Tile
            </Text>
            <div className="component-grid">
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Default</Text>
                <div className="flex-row">
                  <Tile>Tile</Tile>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">States</Text>
                <div className="flex-row">
                  <Tile>Unselected</Tile>
                </div>
                <div className="flex-row">
                  <Tile selected>Selected</Tile>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Disabled</Text>
                <div className="flex-row">
                  <Tile disabled>Disabled</Tile>
                </div>
                <div className="flex-row">
                  <Tile disabled selected>Disabled selected</Tile>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Timepicker Section */}
        {isComponentVisible('Timepicker') && (
          <section className="component-section" id="timepicker">
            <Text preset="heading-2" className="section-heading" onClick={() => setActiveSection('timepicker')}>
              Timepicker
            </Text>
            <div className="component-grid">
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Default</Text>
                <div className="flex-row">
                  <Timepicker value="12:00">
                    <TimepickerControl/>
                  </Timepicker>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">With Seconds & Timezones</Text>
                <div className="flex-row">
                  <Timepicker withSeconds>
                    <TimepickerControl/>
                  </Timepicker>
                </div>
                <div className="flex-row">
                  <Timepicker withSeconds>
                    <TimepickerControl/>
                    <TimepickerTimezoneList/>
                  </Timepicker>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">States</Text>
                <div className="flex-row">
                  <Timepicker readOnly>
                    <TimepickerControl/>
                  </Timepicker>
                </div>
                <div className="flex-row">
                  <Timepicker invalid>
                    <TimepickerControl/>
                  </Timepicker>
                </div>
                <div className="flex-row">
                  <Timepicker readOnly invalid>
                    <TimepickerControl/>
                  </Timepicker>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Disabled</Text>
                <div className="flex-row">
                  <Timepicker disabled readOnly>
                    <TimepickerControl/>
                  </Timepicker>
                </div>
                <div className="flex-row">
                  <Timepicker disabled invalid>
                    <TimepickerControl/>
                  </Timepicker>
                </div>
                <div className="flex-row">
                  <Timepicker disabled readOnly invalid>
                    <TimepickerControl/>
                  </Timepicker>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Toaster Section */}
        {isComponentVisible('Toaster') && (
          <section className="component-section" id="toaster">
            <Text preset="heading-2" className="section-heading" onClick={() => setActiveSection('toaster')}>
              Toaster
            </Text>
            <div className="component-grid">
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Default</Text>
                <Toaster/>
                <div className="flex-row">
                  <Button onClick={() => toast('Notification message')}>
                    Trigger toast
                  </Button>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Colors</Text>
                <Toaster id="colors"/>
                <div className="flex-row">
                  <Button color="critical" onClick={() => toast.critical('Critical', {
                    toasterId: 'colors'
                  })}>
                    Critical toast
                  </Button>
                </div>
                <div className="flex-row">
                  <Button color="information" onClick={() => toast.information('Information', {
                    toasterId: 'colors'
                  })}>
                    Information toast
                  </Button>
                </div>
                <div className="flex-row">
                  <Button color="neutral" onClick={() => toast.neutral('Neutral', {
                    toasterId: 'colors'
                  })}>
                    Neutral toast
                  </Button>
                </div>
                <div className="flex-row">
                  <Button color="primary" onClick={() => toast.primary('Primary', {
                    toasterId: 'colors'
                  })}>
                    Primary toast
                  </Button>
                </div>
                <div className="flex-row">
                  <Button color="success" onClick={() => toast.success('Success', {
                    toasterId: 'colors'
                  })}>
                    Success toast
                  </Button>
                </div>
                <div className="flex-row">
                  <Button color="warning" onClick={() => toast.warning('Warning', {
                    toasterId: 'colors'
                  })}>
                    Warning toast
                  </Button>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Non-dismissable</Text>
                <Toaster id="dismissible"
                         dismissible={false} />
                <div className="flex-row">
                  <Button onClick={() => toast('Non dismissible toast', {
                    toasterId: 'dismissible'
                  })}>
                    Trigger toast
                  </Button>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">With Icon</Text>
                <Toaster id="icon" />
                <div className="flex-row">
                  <Button onClick={() => toast('Notification message with icon', {
                    icon: ICON_NAME.circleInfo,
                    toasterId: 'icon'
                  })}>
                    Trigger toast
                  </Button>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">With Icon</Text>
                <Toaster
                  id="top-start"
                  position="top-start"
                />
                <Toaster
                  id="top"
                  position="top"
                />
                <Toaster
                  id="top-end"
                  position="top-end"
                />
                <Toaster
                  id="bottom-start"
                  position="bottom-start"
                />
                <Toaster
                  id="bottom"
                  position="bottom"
                />
                <Toaster
                  id="bottom-end"
                  position="bottom-end"
                />
                <div className="flex-row">
                  <Button style={{flex: '1 1'}} onClick={() => toast('Notification message', {
                    toasterId: 'top-start'
                  })}>
                    Top Start
                  </Button>
                  <Button style={{flex: '1 1'}} onClick={() => toast('Notification message', {
                    toasterId: 'top'
                  })}>
                    Top
                  </Button>
                  <Button style={{flex: '1 1'}} onClick={() => toast('Notification message', {
                    toasterId: 'top-end'
                  })}>
                    Top End
                  </Button>
                </div>
                  <div className="flex-row">
                  <Button style={{flex: '1 1'}} onClick={() => toast('Notification message', {
                    toasterId: 'bottom-start'
                  })}>
                    Bottom Start
                  </Button>
                  <Button style={{flex: '1 1'}} onClick={() => toast('Notification message', {
                    toasterId: 'bottom'
                  })}>
                    Bottom
                  </Button>
                  <Button style={{flex: '1 1'}} onClick={() => toast('Notification message', {
                    toasterId: 'bottom-end'
                  })}>
                    Bottom End
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Toggle Section */}
        {isComponentVisible('Toggle') && (
          <section className="component-section" id="toggle">
            <Text preset="heading-2" className="section-heading" onClick={() => setActiveSection('toggle')}>
              Toggle
            </Text>
            <div className="component-grid">
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Default</Text>
                <Toggle>
                  <ToggleControl/>
                </Toggle>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">With label</Text>
                <Toggle>
                  <ToggleControl/>
                  <ToggleLabel>
                    Toggle Label
                  </ToggleLabel>
                </Toggle>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">With inner labels</Text>
                <Toggle withLabels>
                  <ToggleControl/>
                </Toggle>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">States</Text>
                <div className="flex-column">
                  <Toggle>
                    <ToggleControl/>
                    <ToggleLabel>
                      Unchecked
                    </ToggleLabel>
                  </Toggle>
                  <Toggle checked>
                    <ToggleControl/>
                    <ToggleLabel>
                      Checked
                    </ToggleLabel>
                  </Toggle>
                  <Toggle invalid>
                    <ToggleControl/>
                    <ToggleLabel>
                      Invalid
                    </ToggleLabel>
                  </Toggle>
                  <Toggle invalid checked>
                    <ToggleControl/>
                    <ToggleLabel>
                      Invalid Checked
                    </ToggleLabel>
                  </Toggle>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Disabled</Text>
                <div className="flex-column">
                  <Toggle disabled>
                    <ToggleControl/>
                    <ToggleLabel>
                      Disabled
                    </ToggleLabel>
                  </Toggle>
                  <Toggle disabled checked>
                    <ToggleControl/>
                    <ToggleLabel>
                      Disabled Checked
                    </ToggleLabel>
                  </Toggle>
                  <Toggle invalid>
                    <ToggleControl/>
                    <ToggleLabel>
                      Disabled Invalid
                    </ToggleLabel>
                  </Toggle>
                  <Toggle invalid checked>
                    <ToggleControl/>
                    <ToggleLabel>
                      Disabled Invalid Checked
                    </ToggleLabel>
                  </Toggle>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Tooltip Section */}
        {isComponentVisible('Tooltip') && (
          <section className="component-section" id="tooltip">
            <Text preset="heading-2" className="section-heading"
                  onClick={() => setActiveSection('tooltip')}>
              Tooltip
            </Text>
            <div className="component-grid">
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Default</Text>
                <div className="flex-row">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button>Tooltip Trigger</Button>
                    </TooltipTrigger>
                    <TooltipContent>Tooltip Content</TooltipContent>
                  </Tooltip>
                </div>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Positions</Text>
                <div className="flex-row">
                  <Tooltip position="top">
                    <TooltipTrigger asChild>
                      <Button style={{flex: '1 1'}} variant="outline" size="sm">Top</Button>
                    </TooltipTrigger>
                    <TooltipContent>Top tooltip</TooltipContent>
                  </Tooltip>
                  <Tooltip position="top-start">
                    <TooltipTrigger asChild>
                      <Button style={{flex: '1 1'}} variant="outline" size="sm">Top Start</Button>
                    </TooltipTrigger>
                    <TooltipContent>Top start tooltip</TooltipContent>
                  </Tooltip>
                  <Tooltip position="top-end">
                    <TooltipTrigger asChild>
                      <Button style={{flex: '1 1'}} variant="outline" size="sm">Top End</Button>
                    </TooltipTrigger>
                    <TooltipContent>Top end tooltip</TooltipContent>
                  </Tooltip>
                </div>
                    <div className="flex-row">
                  <Tooltip position="left">
                    <TooltipTrigger asChild>
                      <Button style={{flex: '1 1'}} variant="outline" size="sm">Left</Button>
                    </TooltipTrigger>
                    <TooltipContent>Left tooltip</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button style={{flex: '1 1'}} variant="outline" size="sm">Auto</Button>
                    </TooltipTrigger>
                    <TooltipContent>Auto tooltip</TooltipContent>
                  </Tooltip>
                  <Tooltip position="right">
                    <TooltipTrigger asChild>
                      <Button style={{flex: '1 1'}} variant="outline" size="sm">Right</Button>
                    </TooltipTrigger>
                    <TooltipContent>Right tooltip</TooltipContent>
                  </Tooltip>
                </div>
                <div className="flex-row">
                  <Tooltip position="bottom">
                    <TooltipTrigger asChild>
                      <Button style={{flex: '1 1'}} variant="outline" size="sm">Bottom</Button>
                    </TooltipTrigger>
                    <TooltipContent>Bottom tooltip</TooltipContent>
                  </Tooltip>
                  <Tooltip position="bottom-start">
                    <TooltipTrigger asChild>
                      <Button style={{flex: '1 1'}} variant="outline" size="sm">Bottom Start</Button>
                    </TooltipTrigger>
                    <TooltipContent>Bottom start tooltip</TooltipContent>
                  </Tooltip>
                  <Tooltip position="bottom-end">
                    <TooltipTrigger asChild>
                      <Button style={{flex: '1 1'}} variant="outline" size="sm">Bottom End</Button>
                    </TooltipTrigger>
                    <TooltipContent>Bottom end tooltip</TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TreeView Section */}
        {isComponentVisible('TreeView') && (
          <section className="component-section" id="treeview">
            <Text preset="heading-2" className="section-heading"
                  onClick={() => setActiveSection('treeview')}>
              Tree View
            </Text>
            <div className="component-grid">
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Default</Text>
                <TreeView
                  items={[
                    {
                      id: 'file1',
                      name: 'File 1'
                    },
                    {
                      id: 'folder1',
                      name: 'Folder 1',
                      children: [
                        {
                          id: 'file2',
                          name: 'File 2'
                        }
                      ]
                    }
                  ]}
                >
                  <TreeViewNode
                    item={{
                      id: 'file1',
                      name: 'File 1'
                    }}
                  />
                  <TreeViewNodes>
                    <TreeViewNode
                      item={{
                        id: 'folder1',
                        name: 'Folder 1',
                        children: [
                          {
                            id: 'file2',
                            name: 'File 2'
                          }
                        ]
                      }}
                    />
                  </TreeViewNodes>
                </TreeView>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Multiple</Text>
                <TreeView
                  multiple
                  items={[
                    {
                      id: 'file1',
                      name: 'File 1'
                    },
                    {
                      id: 'folder1',
                      name: 'Folder 1',
                      children: [
                        {
                          id: 'file2',
                          name: 'File 2'
                        }
                      ]
                    }
                  ]}
                >
                  <TreeViewNode
                    item={{
                      id: 'file1',
                      name: 'File 1'
                    }}
                  />
                  <TreeViewNodes>
                    <TreeViewNode
                      item={{
                        id: 'folder1',
                        name: 'Folder 1',
                        children: [
                          {
                            id: 'file2',
                            name: 'File 2'
                          }
                        ]
                      }}
                    />
                  </TreeViewNodes>
                </TreeView>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Disabled</Text>
                <TreeView
                  disabled
                  items={[
                    {
                      id: 'file1',
                      name: 'File 1'
                    },
                    {
                      id: 'folder1',
                      name: 'Folder 1',
                      children: [
                        {
                          id: 'file2',
                          name: 'File 2'
                        }
                      ]
                    }
                  ]}
                >
                  <TreeViewNode
                    item={{
                      id: 'file1',
                      name: 'File 1'
                    }}
                  />
                  <TreeViewNodes>
                    <TreeViewNode
                      item={{
                        id: 'folder1',
                        name: 'Folder 1',
                        children: [
                          {
                            id: 'file2',
                            name: 'File 2'
                          }
                        ]
                      }}
                    />
                  </TreeViewNodes>
                </TreeView>
              </div>
              <div className="component-card">
                <Text preset="paragraph" className="component-card-label">Disabled item</Text>
                <TreeView
                  items={[
                    {
                      id: 'file1',
                      name: 'File 1',
                      disabled: true
                    },
                    {
                      id: 'folder1',
                      name: 'Folder 1',
                      children: [
                        {
                          id: 'file2',
                          name: 'File 2'
                        }
                      ]
                    }
                  ]}
                >
                  <TreeViewNode
                    item={{
                      id: 'file1',
                      name: 'File 1',
                      disabled: true
                    }}
                  />
                  <TreeViewNodes>
                    <TreeViewNode
                      item={{
                        id: 'folder1',
                        name: 'Folder 1',
                        children: [
                          {
                            id: 'file2',
                            name: 'File 2'
                          }
                        ]
                      }}
                    />
                  </TreeViewNodes>
                </TreeView>
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  )
};
