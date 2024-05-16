const a = (
        <Button
            size="sm"
            variant="secondary"
            {...alpha}
            {...dc.getButtonProps({ type: 'submit' })}
            >
            {fetcher.state === 'idle'
                ? dc.doubleCheck
                    ? 'You sure?'
                    : 'Delete'
                : 'Deleting...'}
        </Button>);
