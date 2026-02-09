'use client';

import { useState } from 'react';
import { Search, ChevronDown, ChevronUp, MessageSquare, BookOpen, HelpCircle, Ticket, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'billing' | 'technical' | 'account' | 'esim';
}

const faqs: FAQ[] = [
  {
    id: '1',
    question: 'Comment activer mon eSIM ?',
    answer: 'Pour activer votre eSIM, suivez ces étapes : 1) Achetez un forfait eSIM depuis votre tableau de bord, 2) Recevez le QR code par email, 3) Allez dans Réglages > Données cellulaires > Ajouter un plan de données sur votre iPhone, ou Paramètres > Connexions > Gestion SIM sur Android, 4) Scannez le QR code, 5) Activez le plan eSIM.',
    category: 'esim',
  },
  {
    id: '2',
    question: 'Quels appareils sont compatibles avec les eSIM ?',
    answer: 'Les eSIM sont compatibles avec de nombreux appareils récents, notamment les iPhone XR et plus récents, les iPad Pro, les Samsung Galaxy S20 et plus récents, les Google Pixel 3 et plus récents, et bien d\'autres. Consultez notre page Appareils compatibles pour une liste complète.',
    category: 'esim',
  },
  {
    id: '3',
    question: 'Comment puis-je payer mon abonnement ?',
    answer: 'Nous acceptons les cartes de crédit (Visa, Mastercard, American Express), PayPal, et les virements bancaires. Vous pouvez mettre à jour votre méthode de paiement à tout moment depuis la section Facturation de votre compte.',
    category: 'billing',
  },
  {
    id: '4',
    question: 'Puis-je utiliser mon eSIM dans plusieurs pays ?',
    answer: 'Oui ! Nos forfaits régionaux et internationaux vous permettent d\'utiliser votre eSIM dans plusieurs pays. Vérifiez la couverture de votre forfait avant l\'achat pour voir tous les pays inclus.',
    category: 'general',
  },
  {
    id: '5',
    question: 'Que faire si je n\'arrive pas à activer mon eSIM ?',
    answer: 'Si vous rencontrez des problèmes d\'activation, vérifiez que votre appareil est compatible, que vous avez une connexion Internet stable, et que vous avez scanné correctement le QR code. Si le problème persiste, contactez notre équipe de support via le bouton "Ouvrir un ticket" ci-dessous.',
    category: 'technical',
  },
  {
    id: '6',
    question: 'Comment puis-je réinitialiser mon mot de passe ?',
    answer: 'Cliquez sur "Mot de passe oublié" sur la page de connexion. Entrez votre adresse email et vous recevrez un lien de réinitialisation. Si vous ne recevez pas l\'email, vérifiez votre dossier spam ou contactez le support.',
    category: 'account',
  },
  {
    id: '7',
    question: 'Combien de temps prend l\'activation d\'un eSIM ?',
    answer: 'L\'activation d\'un eSIM est généralement instantanée après le scan du QR code. Cependant, dans certains cas, cela peut prendre jusqu\'à 15 minutes. Si l\'activation prend plus de temps, redémarrez votre appareil et contactez le support si nécessaire.',
    category: 'technical',
  },
  {
    id: '8',
    question: 'Puis-je avoir plusieurs eSIM sur mon appareil ?',
    answer: 'Oui, la plupart des appareils compatibles permettent de stocker plusieurs profils eSIM. Cependant, vous ne pouvez activer qu\'un seul eSIM à la fois (en plus de votre carte SIM physique si vous en avez une).',
    category: 'esim',
  },
  {
    id: '9',
    question: 'Comment annuler mon abonnement ?',
    answer: 'Vous pouvez annuler votre abonnement à tout moment depuis la section Facturation de votre compte. L\'annulation prendra effet à la fin de votre période de facturation actuelle. Vous continuerez à avoir accès au service jusqu\'à cette date.',
    category: 'billing',
  },
  {
    id: '10',
    question: 'Qu\'est-ce qu\'un CDR ?',
    answer: 'CDR signifie Call Detail Record (Détail d\'appel). Il s\'agit d\'un enregistrement de toutes les activités de communication (appels, SMS, utilisation de données) sur votre ligne eSIM. Vous pouvez consulter vos CDRs depuis la section CDRs de votre tableau de bord.',
    category: 'general',
  },
  {
    id: '11',
    question: 'Comment fonctionne le partage de données ?',
    answer: 'Le partage de données permet à plusieurs appareils d\'utiliser le même forfait de données. Vous pouvez activer cette fonctionnalité depuis les paramètres de votre compte et ajouter des appareils supplémentaires.',
    category: 'general',
  },
  {
    id: '12',
    question: 'Mon eSIM fonctionnera-t-il en itinérance ?',
    answer: 'Oui, nos eSIM fonctionnent en itinérance dans tous les pays couverts par votre forfait. Assurez-vous que l\'itinérance est activée sur votre appareil dans les paramètres réseau.',
    category: 'esim',
  },
  {
    id: '13',
    question: 'Comment mettre à jour mes informations de compte ?',
    answer: 'Vous pouvez mettre à jour vos informations personnelles, votre adresse email, et votre numéro de téléphone depuis la section Paramètres de votre compte. Les modifications sont appliquées immédiatement.',
    category: 'account',
  },
  {
    id: '14',
    question: 'Que faire si je perds mon téléphone avec l\'eSIM ?',
    answer: 'Contactez immédiatement notre support pour désactiver votre eSIM. Vous pouvez également désactiver l\'eSIM depuis votre tableau de bord si vous avez accès à votre compte depuis un autre appareil. Une fois désactivé, personne ne pourra utiliser votre eSIM.',
    category: 'account',
  },
  {
    id: '15',
    question: 'Comment consulter mon utilisation de données ?',
    answer: 'Vous pouvez consulter votre utilisation de données en temps réel depuis la section Rapports > Utilisation des données de votre tableau de bord. Les données sont mises à jour toutes les heures.',
    category: 'general',
  },
];

const categories = [
  { id: 'all', label: 'Toutes les questions', icon: BookOpen },
  { id: 'general', label: 'Général', icon: HelpCircle },
  { id: 'esim', label: 'eSIM', icon: MessageSquare },
  { id: 'billing', label: 'Facturation', icon: Ticket },
  { id: 'technical', label: 'Technique', icon: HelpCircle },
  { id: 'account', label: 'Compte', icon: BookOpen },
];

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedFAQs, setExpandedFAQs] = useState<string[]>([]);

  const toggleFAQ = (id: string) => {
    setExpandedFAQs((prev) =>
      prev.includes(id) ? prev.filter((faqId) => faqId !== id) : [...prev, id]
    );
  };

  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative px-8 py-12 md:py-16">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Centre d'aide
            </h1>
            <p className="text-lg text-blue-100 mb-6">
              Trouvez rapidement les réponses à vos questions ou contactez notre équipe de support
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/help"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                <Ticket className="w-5 h-5" />
                Ouvrir un ticket
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-500/20 text-white border border-white/30 rounded-lg font-semibold hover:bg-blue-500/30 transition-colors">
                <BookOpen className="w-5 h-5" />
                Documentation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher dans les questions fréquentes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              )}
            >
              <Icon className="w-4 h-4" />
              {category.label}
            </button>
          );
        })}
      </div>

      {/* FAQs Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Questions fréquentes ({filteredFAQs.length})
          </h2>
        </div>

        {filteredFAQs.length > 0 ? (
          <div className="space-y-3">
            {filteredFAQs.map((faq) => {
              const isExpanded = expandedFAQs.includes(faq.id);
              const CategoryIcon = categories.find(c => c.id === faq.category)?.icon || HelpCircle;

              return (
                <div
                  key={faq.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-6 py-4 flex items-start justify-between gap-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CategoryIcon className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{faq.question}</h3>
                        {isExpanded && (
                          <p className="text-sm text-gray-600 mt-2 leading-relaxed">{faq.answer}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 font-medium mb-1">Aucune question trouvée</p>
            <p className="text-sm text-gray-500 mb-6">
              Essayez de modifier votre recherche ou vos filtres
            </p>
            <Link
              href="/help"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <Ticket className="w-5 h-5" />
              Ouvrir un ticket de support
            </Link>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-8 text-center">
        <MessageSquare className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Vous ne trouvez pas ce que vous cherchez ?
        </h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Notre équipe de support est là pour vous aider. Ouvrez un ticket et nous vous répondrons dans les plus brefs délais.
        </p>
        <Link
          href="/help"
          className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
        >
          <Ticket className="w-5 h-5" />
          Ouvrir un ticket de support
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
