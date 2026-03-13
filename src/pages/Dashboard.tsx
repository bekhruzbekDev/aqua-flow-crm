import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Droplets, ShoppingCart, AlertTriangle, Clock, ArrowUpRight } from 'lucide-react';
import { mockClients } from '@/shared/data/mockClients';
import { getDebtStatus, getBottleBalance } from '@/entities/client/types';
import { formatCurrency } from '@/shared/lib/format';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function DashboardPage() {
  const totalDebt = mockClients
    .filter((c) => c.balance < 0)
    .reduce((sum, c) => sum + Math.abs(c.balance), 0);
  const totalBottlesOut = mockClients.reduce((sum, c) => sum + getBottleBalance(c), 0);
  const stopListedCount = mockClients.filter((c) => c.isStopListed).length;
  const criticalDebtors = mockClients
    .filter((c) => c.balance < c.creditLimit)
    .sort((a, b) => a.balance - b.balance);

  const recentActivities = [
    { icon: ShoppingCart, text: 'Order #1042 delivered to AquaTech LLC', time: '2 hours ago' },
    { icon: Droplets, text: '5 bottles returned by Nodira Usmanova', time: '3 hours ago' },
    { icon: DollarSign, text: 'Payment received from Feruza Abdullaeva', time: '5 hours ago' },
    { icon: AlertTriangle, text: 'Summit Business Center moved to stop-list', time: '1 day ago' },
    { icon: Clock, text: 'Promise to pay recorded for Green Office Park', time: '1 day ago' },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Overview of your water delivery operations</p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Debt', value: formatCurrency(totalDebt), icon: DollarSign, accent: 'text-destructive', bg: 'bg-destructive/10' },
          { label: 'Active Clients', value: mockClients.length.toString(), icon: ShoppingCart, accent: 'text-primary', bg: 'bg-accent' },
          { label: 'Bottles at Customers', value: totalBottlesOut.toString(), icon: Droplets, accent: 'text-primary', bg: 'bg-accent' },
          { label: 'Stop-Listed', value: stopListedCount.toString(), icon: AlertTriangle, accent: 'text-destructive', bg: 'bg-destructive/10' },
        ].map((kpi) => (
          <motion.div key={kpi.label} variants={item}>
            <Card className="rounded-2xl shadow-sm border-border/60 hover:shadow-md transition-shadow">
              <CardContent className="flex items-center gap-4 p-5">
                <div className={`w-12 h-12 rounded-xl ${kpi.bg} flex items-center justify-center`}>
                  <kpi.icon className={`h-6 w-6 ${kpi.accent}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{kpi.label}</p>
                  <p className="text-2xl font-bold">{kpi.value}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Critical Debtors */}
        <motion.div variants={item}>
          <Card className="rounded-2xl shadow-sm border-border/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Critical Debtors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {criticalDebtors.length === 0 && (
                <p className="text-sm text-muted-foreground py-4 text-center">No critical debtors 🎉</p>
              )}
              {criticalDebtors.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-destructive/5 border border-destructive/10"
                >
                  <div>
                    <p className="font-medium text-sm">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.company || c.region}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm text-destructive">{formatCurrency(c.balance)}</p>
                    <p className="text-[10px] text-muted-foreground">limit: {formatCurrency(c.creditLimit)}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div variants={item}>
          <Card className="rounded-2xl shadow-sm border-border/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {recentActivities.map((a, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shrink-0 mt-0.5">
                    <a.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{a.text}</p>
                    <p className="text-xs text-muted-foreground">{a.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
