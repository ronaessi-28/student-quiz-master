import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, User, Mail, Shield, Save, Award, TrendingUp } from 'lucide-react';
import { Label } from '@/components/ui/label';

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const [stats, setStats] = useState({ quizzesTaken: 0, avgScore: 0, totalQuizzes: 0 });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate('/auth');
      return;
    }

    setUserId(session.user.id);
    setEmail(session.user.email || '');

    // Fetch profile
    const { data: profileData } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', session.user.id)
      .single();

    if (profileData) {
      setFullName(profileData.full_name || '');
    }

    // Fetch role
    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', session.user.id)
      .single();

    if (roleData) {
      setRole(roleData.role as 'user' | 'admin');
    }

    // Fetch stats
    if (roleData?.role === 'admin') {
      const { count } = await supabase
        .from('quizzes')
        .select('*', { count: 'exact', head: true })
        .eq('created_by', session.user.id);

      const { count: activeCount } = await supabase
        .from('quiz_attempts')
        .select('*', { count: 'exact', head: true });

      setStats({ quizzesTaken: 0, avgScore: 0, totalQuizzes: count || 0 });
    } else {
      const { data: attempts } = await supabase
        .from('quiz_attempts')
        .select('score, total_questions')
        .eq('user_id', session.user.id);

      const quizzesTaken = attempts?.length || 0;
      const avgScore = attempts?.length 
        ? Math.round((attempts.reduce((acc, a) => acc + (a.score / a.total_questions) * 100, 0) / attempts.length))
        : 0;

      setStats({ quizzesTaken, avgScore, totalQuizzes: 0 });
    }

    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);

    const { error } = await supabase
      .from('profiles')
      .update({ full_name: fullName })
      .eq('id', userId);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Success',
        description: 'Profile updated successfully'
      });
    }

    setSaving(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-6">
      <div className="container mx-auto max-w-4xl space-y-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Card className="border-2 overflow-hidden">
          <div className={`h-32 bg-gradient-to-r ${role === 'admin' ? 'from-purple-500 to-pink-500' : 'from-blue-500 to-cyan-500'}`} />
          <CardHeader className="relative pt-0 pb-6">
            <div className="flex items-end gap-4 -mt-16">
              <div className={`h-32 w-32 rounded-full border-4 border-background bg-gradient-to-br ${role === 'admin' ? 'from-purple-500 to-pink-500' : 'from-primary to-primary/60'} flex items-center justify-center text-white font-bold text-5xl shadow-lg transition-transform hover:scale-105`}>
                {fullName.charAt(0).toUpperCase() || '?'}
              </div>
              <div className="mb-4">
                <CardTitle className="text-3xl mb-2">{fullName || 'User'}</CardTitle>
                <Badge variant={role === 'admin' ? 'default' : 'secondary'} className="text-sm">
                  <Shield className="mr-1 h-3 w-3" />
                  {role === 'admin' ? 'Administrator' : 'User'}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your name"
                  className="transition-all focus:scale-[1.01]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  value={email}
                  disabled
                  className="bg-muted"
                />
              </div>

              <Button onClick={handleSave} disabled={saving} size="lg" className="w-full">
                {saving ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>

            {role === 'admin' ? (
              <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Admin Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-background/60 rounded-lg">
                    <span className="text-sm font-medium">Quizzes Created</span>
                    <Badge variant="outline" className="text-base font-bold">{stats.totalQuizzes}</Badge>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Your Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-background/60 rounded-lg">
                    <span className="text-sm font-medium">Quizzes Taken</span>
                    <Badge variant="outline" className="text-base font-bold">{stats.quizzesTaken}</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-background/60 rounded-lg">
                    <span className="text-sm font-medium">Average Score</span>
                    <Badge variant="outline" className="text-base font-bold">{stats.avgScore}%</Badge>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
