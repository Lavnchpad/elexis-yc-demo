import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import React from 'react'

export default function LoadingButton({ children, loading, className, ...rest }) {
    return (
        <Button disabled={loading} className={className} {...rest}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children}
        </Button>
    );
};