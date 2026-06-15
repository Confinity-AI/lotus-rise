"use client";

import { Animation, Button, Dropdown, NavIcon, Row } from "@once-ui-system/core";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { LotusRiseWordmark } from "./LotusRiseWordmark";

export function Header() {
  const [isActive, setIsActive] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [showSectors, setShowSectors] = useState(false);
  const pathname = usePathname() || "";
  
  const isProductsActive = pathname.startsWith("/products");
  const isSectorsActive = pathname.startsWith("/sectors");
  const isPricingActive = pathname === "/pricing";
  const isAboutActive = pathname === "/about" || pathname.includes("/about");
  const isHome = pathname === "/";
  const navColor = (active: boolean) =>
    active ? (isHome ? "var(--he-moss)" : "var(--brand-primary)") : isHome ? "#4a4d50" : "var(--neutral-text-medium)";
  const navWeight = (active: boolean) => (active ? "600" : "400");

  return (
    <header className={isHome ? "lr-site-header he-site-header" : "lr-site-header"}>
    <Row 
      fillWidth 
      horizontal="center" 
      position="fixed" 
      zIndex={10} 
      paddingX="8"
      className="lr-header-bar"
      style={{ position: "fixed", top: 0, left: 0, right: 0 }}
    >
      <Row maxWidth="l" padding="4">
        <Row fillWidth horizontal="between" vertical="center" paddingY="8" paddingLeft="16" paddingRight="8">
          
          {/* Logo & Mobile Drawer Trigger */}
          <Row minWidth={7} vertical="center" gap="8">
            <Animation
              hide
              s={{ hide: false }}
              slideDown={1}
              triggerType="manual"
              active={isActive}
              duration={300}
              trigger={
                <NavIcon onClick={() => setIsActive(!isActive)} isActive={isActive} />
              }
            >
              <Dropdown position="absolute" top="48" padding="4" gap="2" radius="l" width={16}>
                <Button size="l" fillWidth horizontal="start" variant="tertiary" href="/products/eval-path">
                  Evaluation
                </Button>
                <Button size="l" fillWidth horizontal="start" variant="tertiary" href="/products/grant-tracker">
                  Grant Management
                </Button>
                <Button size="l" fillWidth horizontal="start" variant="tertiary" href="/products/strat-path">
                  Strategy (Soon)
                </Button>
                <Button size="l" fillWidth horizontal="start" variant="tertiary" href="/products/guide-path">
                  Guidance
                </Button>
                <Button size="l" fillWidth horizontal="start" variant="tertiary" href="/sectors/nonprofit">
                  Nonprofits &amp; grantees
                </Button>
                <Button size="l" fillWidth horizontal="start" variant="tertiary" href="/sectors/funder">
                  Foundations &amp; funders
                </Button>
                <Button size="l" fillWidth horizontal="start" variant="tertiary" href="/sectors/capacity">
                  Capacity builders
                </Button>
                <Button size="l" fillWidth horizontal="start" variant="tertiary" href="/pricing">
                  Pricing
                </Button>
                <Button size="l" fillWidth horizontal="start" variant="tertiary" href="/about">
                  About Us
                </Button>
                {isHome ? (
                  <Button size="l" fillWidth horizontal="start" variant="tertiary" href="/#get-started">
                    Request a pilot
                  </Button>
                ) : null}
              </Dropdown>
            </Animation>
            <LotusRiseWordmark />
          </Row>

          {/* Desktop Navigation Links */}
          <Row gap="8" textVariant="label-default-s" s={{ hide: true }} vertical="center" className="he-header-nav" style={{ position: "relative" }}>
            
            {/* Products Dropdown Trigger */}
            <div 
              onMouseEnter={() => setShowProducts(true)} 
              onMouseLeave={() => setShowProducts(false)}
              style={{ position: "relative" }}
            >
              <Button 
                size="s" 
                variant="tertiary"
                style={{
                  color: navColor(isProductsActive),
                  fontWeight: navWeight(isProductsActive),
                }}
              >
                Products ▾
              </Button>
              {showProducts && (
                <Dropdown 
                  position="absolute" 
                  top="32" 
                  left="0" 
                  padding="4" 
                  gap="2" 
                  radius="l" 
                  width={14}
                  style={{ backgroundColor: "var(--neutral-background)" }}
                >
                  <Button size="s" fillWidth horizontal="start" variant="tertiary" href="/products/eval-path">Evaluation</Button>
                  <Button size="s" fillWidth horizontal="start" variant="tertiary" href="/products/grant-tracker">Grant Management</Button>
                  <Button size="s" fillWidth horizontal="start" variant="tertiary" href="/products/strat-path">Strategy (Soon)</Button>
                  <Button size="s" fillWidth horizontal="start" variant="tertiary" href="/products/guide-path">Guidance (AI)</Button>
                </Dropdown>
              )}
            </div>

            {/* Who We Serve Dropdown Trigger */}
            <div 
              onMouseEnter={() => setShowSectors(true)} 
              onMouseLeave={() => setShowSectors(false)}
              style={{ position: "relative" }}
            >
              <Button 
                size="s" 
                variant="tertiary"
                style={{
                  color: navColor(isSectorsActive),
                  fontWeight: navWeight(isSectorsActive),
                }}
              >
                Who We Serve ▾
              </Button>
              {showSectors && (
                <Dropdown 
                  position="absolute" 
                  top="32" 
                  left="0" 
                  padding="4" 
                  gap="2" 
                  radius="l" 
                  width={16}
                  style={{ backgroundColor: "var(--neutral-background)" }}
                >
                  <Button size="s" fillWidth horizontal="start" variant="tertiary" href="/sectors/nonprofit">Nonprofit Programs</Button>
                  <Button size="s" fillWidth horizontal="start" variant="tertiary" href="/sectors/funder">Foundation Funders</Button>
                  <Button size="s" fillWidth horizontal="start" variant="tertiary" href="/sectors/capacity">Capacity Support Orgs</Button>
                </Dropdown>
              )}
            </div>

            <Button 
              size="s" 
              variant="tertiary" 
              href="/pricing"
              style={{
                color: navColor(isPricingActive),
                fontWeight: navWeight(isPricingActive),
              }}
            >
              Pricing
            </Button>
            <Button 
              size="s" 
              variant="tertiary" 
              href="/about"
              style={{
                color: navColor(isAboutActive),
                fontWeight: navWeight(isAboutActive),
              }}
            >
              About Us
            </Button>
          </Row>

          {/* Action Call Header — hidden on mobile; homepage sticky bar handles ICP CTAs */}
          <Row minWidth={7} horizontal="end" s={{ hide: true }}>
            <a
              href={isHome ? "mailto:contact@lotusrise.org?subject=Lotus%20Rise%20Demo%20Inquiry" : "mailto:contact@lotusrise.org?subject=Lotus Rise Demo Inquiry"}
              className="lr-btn lr-btn--primary lr-btn--sm"
            >
              {isHome ? "Schedule a demo" : "Get in touch"}
            </a>
          </Row>

        </Row>
      </Row>
    </Row>
    </header>
  );
}
