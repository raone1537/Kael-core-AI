/**
 * Kael Core AI - Superagent Configuration
 * Comprehensive automation for chatbot, lead scoring, email, content generation, and analytics
 */

// ============================================================================
// 1. CHATBOT CONFIGURATION
// ============================================================================

const CHATBOT_CONFIG = {
  name: 'Kael Core Assistant',
  description: 'AI-powered chatbot for Kael Core AI website',
  systemPrompt: `You are Kael Core Assistant, a helpful AI that answers questions about Kael Core AI - a next-generation AI platform for enterprise automation and predictive analytics.

IMPORTANT KNOWLEDGE:
- Kael Core AI provides: Neural Orchestration, Predictive Guardrails, Contextual Memory
- Pricing: Starter ($299/mo), Professional ($999/mo), Enterprise (custom)
- Uptime Guarantee: 99.99%
- Average Latency: <45ms
- Support: Email (Starter), Priority (Pro), 24/7 (Enterprise)

CONVERSATION RULES:
1. Be helpful, professional, and friendly
2. Always provide accurate pricing information
3. If asked about technical details, explain simply
4. Encourage users to contact sales for enterprise questions
5. Suggest relevant pricing tiers based on their needs
6. Always offer to connect them with our team
7. Maintain context of previous messages

WHEN USER MENTIONS:
- "Pricing" or "cost" → Explain all 3 tiers, ask what they need
- "Security" → Mention SOC 2, encryption, compliance
- "Integration" → Say 2-4 hours with our API and SDKs
- "Features" → Describe neural orchestration, predictive guardrails, memory
- "Demo" or "trial" → Offer to connect with sales team
- "Use case" → Share relevant examples (fraud detection, data pipelines, etc.)`,
  
  responses: {
    greeting: 'Hi! 👋 I\'m Kael Core Assistant. How can I help you today? Feel free to ask about our features, pricing, use cases, or anything else!',
    fallback: 'I\'m not entirely sure about that. Would you like to speak with our team? They can provide more detailed information.',
    contact: 'Great question! I\'d recommend connecting with our team for personalized assistance. Would you like me to help you reach out?'
  },

  quickReplies: [
    'Tell me about pricing',
    'What are the features?',
    'How long does integration take?',
    'Do you have a free trial?',
    'What\'s your uptime guarantee?',
    'Contact sales team'
  ],

  maxMessages: 10, // Store last 10 messages for context
  responseTime: 1000 // ms
};

// ============================================================================
// 2. LEAD SCORING SYSTEM
// ============================================================================

const LEAD_SCORING = {
  // Score calculation rules
  rules: {
    // Contact Info
    email: { points: 10, required: true },
    phone: { points: 5 },
    company: { points: 15 },
    
    // Engagement Signals
    formSubmission: { points: 20 },
    contactForm: { points: 25 },
    chatbot: { points: 15 },
    newsletter: { points: 10 },
    
    // Behavior
    visitedPricing: { points: 20 },
    visitedFeatures: { points: 15 },
    visitedFAQ: { points: 10 },
    downloadedGuide: { points: 30 },
    watchedDemo: { points: 25 },
    
    // Message Content
    mentionsPricing: { points: 20 },
    mentionsImplementation: { points: 25 },
    mentionsBudget: { points: 30 },
    mentionsTimeline: { points: 25 },
    mentionsEnterprise: { points: 40 },
    mentionsStartup: { points: 15 },
    
    // Company Size (inferred)
    largeCompany: { points: 30 },
    mediumCompany: { points: 20 },
    smallCompany: { points: 10 },
    
    // Interest Level
    urgentLanguage: { points: 25 },
    asksForDemo: { points: 35 },
    asksAboutIntegration: { points: 30 },
    comparesToCompetitors: { points: 35 }
  },

  // Lead qualification thresholds
  tiers: {
    hot: { min: 80, label: 'Hot Lead', icon: '🔥', action: 'Sales call within 1 hour' },
    warm: { min: 50, max: 79, label: 'Warm Lead', icon: '☀️', action: 'Follow-up email within 24 hours' },
    cold: { min: 20, max: 49, label: 'Cold Lead', icon: '❄️', action: 'Nurture sequence' },
    unknown: { min: 0, max: 19, label: 'New Contact', icon: '👤', action: 'Welcome sequence' }
  },

  // Auto-assignment rules
  assignment: {
    hot: 'sales@kaelcore.ai',
    warm: 'support@kaelcore.ai',
    cold: 'marketing@kaelcore.ai'
  },

  // Scoring keywords
  keywords: {
    high: ['enterprise', 'budget', 'implementation', 'urgent', 'ROI', 'API', 'integration', 'custom'],
    medium: ['features', 'pricing', 'demo', 'trial', 'use case', 'automation'],
    low: ['question', 'info', 'learn', 'curious']
  }
};

// ============================================================================
// 3. EMAIL AUTOMATION WORKFLOWS
// ============================================================================

const EMAIL_WORKFLOWS = {
  // Workflow 1: Lead Welcome Sequence
  leadWelcome: {
    name: 'Lead Welcome Sequence',
    trigger: 'new_contact_form',
    emails: [
      {
        delay: 0,
        subject: '✨ Welcome to Kael Core AI - Your AI Automation Starts Here',
        template: 'welcome',
        variables: ['firstName', 'company']
      },
      {
        delay: '2d',
        subject: '🚀 Quick Start: Getting Your Team Ready for Kael Core',
        template: 'getStarted',
        condition: 'lead_score > 30'
      },
      {
        delay: '5d',
        subject: '💡 See How Others Use Kael Core - Real Use Cases',
        template: 'useCases',
        condition: 'not_replied'
      },
      {
        delay: '7d',
        subject: '🎯 Let\'s Talk About Your Specific Needs',
        template: 'consultation',
        condition: 'lead_score > 50'
      }
    ]
  },

  // Workflow 2: Hot Lead (High-Priority)
  hotLead: {
    name: 'Hot Lead Priority Track',
    trigger: 'lead_score_above_80',
    emails: [
      {
        delay: 0,
        subject: '🔥 Your Kael Core AI Demo is Ready - Let\'s Schedule',
        template: 'demoOffer',
        priority: 'high'
      },
      {
        delay: '4h',
        subject: 'Quick Question: What\'s Your Primary Use Case?',
        template: 'qualification',
        sendIf: 'no_reply'
      },
      {
        delay: '1d',
        subject: '⏰ 24-Hour Exclusive: Enterprise Onboarding Support',
        template: 'exclusiveOffer'
      }
    ]
  },

  // Workflow 3: Warm Lead Nurture
  warmLead: {
    name: 'Warm Lead Nurture Track',
    trigger: 'lead_score_50_to_79',
    emails: [
      {
        delay: '1d',
        subject: '📊 ROI Calculator: See Your Potential Savings',
        template: 'roiCalculator'
      },
      {
        delay: '3d',
        subject: '👥 Success Story: How DataFlow Inc Saved 70% Processing Time',
        template: 'caseStudy'
      },
      {
        delay: '7d',
        subject: '🎁 Free API Access: Start Building Today',
        template: 'trialOffer'
      }
    ]
  },

  // Workflow 4: Newsletter Subscriber
  newsletter: {
    name: 'Weekly Newsletter',
    trigger: 'newsletter_signup',
    emails: [
      {
        delay: 0,
        subject: '✅ You\'re Subscribed - First Tips Inside',
        template: 'confirmSubscription'
      },
      {
        frequency: 'weekly',
        subject: '📬 Kael Core Weekly: AI Trends & Product Updates',
        template: 'weeklyNewsletter'
      }
    ]
  },

  // Workflow 5: Re-engagement
  reengagement: {
    name: 'Re-engagement Campaign',
    trigger: 'no_activity_30days',
    emails: [
      {
        delay: 0,
        subject: '👋 We Miss You - Here\'s What\'s New in Kael Core',
        template: 'weirdMissYou'
      },
      {
        delay: '3d',
        subject: '⚡ New Features Released - Check Them Out',
        template: 'newFeatures'
      }
    ]
  }
};

// ============================================================================
// 4. CONTENT GENERATION SYSTEM
// ============================================================================

const CONTENT_GENERATION = {
  // Auto-generate blog posts
  blogPosts: {
    schedule: 'weekly',
    topics: [
      'AI Trends in Enterprise Automation',
      'Predictive Analytics ROI Calculator',
      'How to Implement Machine Learning Safely',
      'Real-time Fraud Detection Best Practices',
      'Enterprise API Integration Checklist',
      'The Future of AI-Powered Workflows'
    ],
    length: '800-1000 words',
    template: {
      title: 'Generated from topic + keywords',
      sections: ['Introduction', 'Main Content', 'Real Examples', 'Implementation Steps', 'Conclusion'],
      keywords: 'Auto-extracted for SEO',
      cta: 'Link to relevant feature/pricing'
    }
  },

  // Auto-generate FAQ answers
  faqGeneration: {
    trigger: 'chat_questions_repeated_3_times',
    analysis: 'Extract common questions from chatbot conversations',
    autoGenerate: true,
    review: 'Human approval required'
  },

  // Auto-update testimonials
  testimonials: {
    source: 'customer_feedback',
    extraction: 'Pull quotes from emails, reviews, surveys',
    formatting: 'Add customer name, title, company',
    rotation: 'Show different testimonials daily'
  },

  // Case study generation
  caseStudies: {
    trigger: 'customer_conversion',
    content: [
      'Customer background',
      'Challenge they faced',
      'Solution implemented',
      'Results achieved',
      'Timeline & metrics'
    ],
    format: 'PDF + Web article',
    distribution: 'Email campaigns + Website + LinkedIn'
  },

  // Landing page copy
  landingPages: {
    autoGenerate: true,
    basedOn: 'Lead source + Industry + Company size',
    variants: {
      startup: 'Focus on cost-effectiveness and speed',
      enterprise: 'Focus on security and scalability',
      technical: 'Focus on API and integration',
      business: 'Focus on ROI and efficiency gains'
    }
  }
};

// ============================================================================
// 5. ANALYTICS & TRACKING SYSTEM
// ============================================================================

const ANALYTICS = {
  // Track visitor behavior
  tracking: {
    events: [
      'page_view',
      'button_click',
      'form_started',
      'form_completed',
      'pricing_page_visit',
      'feature_interest',
      'chatbot_interaction',
      'video_watch',
      'download_resource',
      'email_open',
      'email_click',
      'conversion'
    ],
    
    custom: {
      pricingTier: 'Track which pricing tier users view',
      featureInterest: 'Track which features users click',
      timeOnPage: 'Track engagement depth',
      scrollDepth: 'Track content consumption',
      deviceType: 'Track device usage'
    }
  },

  // Dashboard metrics
  dashboard: {
    realtime: {
      activeVisitors: 'Live count',
      topPages: 'Most viewed sections',
      conversionRate: 'Contact forms submitted',
      avgSessionTime: 'Average time on site'
    },
    
    daily: {
      newVisitors: 'First-time visitors',
      returningVisitors: 'Repeat visitors',
      leads: 'New contacts',
      conversions: 'Form submissions',
      bounce_rate: 'Exit percentage'
    },
    
    weekly: {
      traffic: 'Total sessions',
      engagement: 'Avg. pages per session',
      leadQuality: 'Avg. lead score',
      conversionFunnel: 'Visitor → Lead → Customer'
    },
    
    monthly: {
      growth: 'Month-over-month change',
      topReferrers: 'Where traffic comes from',
      campaignPerformance: 'ROI by source',
      customerAcquisition: 'Cost per lead'
    }
  },

  // Predictive analytics
  predictions: {
    churnRisk: 'Predict which leads might leave',
    conversionLikelihood: 'Score leads by conversion probability',
    optimalContactTime: 'Best time to email leads',
    contentRecommendation: 'Suggest content for each visitor',
    nextAction: 'Predict next user action'
  },

  // A/B testing
  abTesting: {
    autoEnable: true,
    variants: [
      {
        name: 'CTA Button Color',
        test: 'Purple vs Blue gradient',
        metric: 'Click rate'
      },
      {
        name: 'Pricing Display',
        test: 'Monthly vs Annual toggle',
        metric: 'Conversion rate'
      },
      {
        name: 'Hero Headline',
        test: 'Variant A vs Variant B',
        metric: 'Form completion rate'
      }
    ]
  }
};

// ============================================================================
// 6. INTEGRATION POINTS
// ============================================================================

const INTEGRATIONS = {
  formspree: {
    endpoint: 'https://formspree.io/f/xdavgwgd',
    onSubmit: [
      'Score lead',
      'Start email workflow',
      'Add to CRM',
      'Notify team'
    ]
  },

  slack: {
    enabled: true,
    notifications: [
      'Hot lead alert (with 2-minute delay)',
      'Daily summary (9am)',
      'Weekly report (Monday 9am)'
    ]
  },

  crm: {
    type: 'HubSpot / Salesforce / Pipedrive',
    sync: 'Real-time',
    fields: ['name', 'email', 'company', 'leadScore', 'pricingTier']
  },

  email: {
    provider: 'SendGrid / Mailgun',
    sender: 'team@kaelcore.ai',
    replyTo: 'support@kaelcore.ai'
  },

  analytics: {
    google: 'Google Analytics 4',
    custom: 'Kael Core Dashboard',
    heat_mapping: 'Hotjar or Similar'
  }
};

// ============================================================================
// EXPORT CONFIGURATION
// ============================================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CHATBOT_CONFIG,
    LEAD_SCORING,
    EMAIL_WORKFLOWS,
    CONTENT_GENERATION,
    ANALYTICS,
    INTEGRATIONS
  };
}
