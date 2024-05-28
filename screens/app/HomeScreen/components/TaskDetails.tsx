import React from 'react';
import { FlatList, ScrollView } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { TaskProps } from '@types';
import { formatRelative } from '@utils';

import { ActivityIndicator, Box, Icon, Tag, Text, TitleBar } from '@components';

interface TaskDetailsProps {
  task: TaskProps | null;
  isLoading: boolean;
  onDeleteTask: (id: string) => void;
}

export function TaskDetails({
  task,
  isLoading,
  onDeleteTask,
}: TaskDetailsProps) {
  const { navigate } = useNavigation();

  function renderTaskDetails() {
    

    const { id, title, description, category, priority, tags, comments } = task!;

    function renderEmptyComments() {
      return (
        <Box justifyContent="center" mt="s16" alignItems="center">
          <Text>No comments available</Text>
        </Box>
      );
    }

    return (
      <Box>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between">
          <Text preset="headingMedium">{title}</Text>

          <Box gap="s12" alignItems="center" flexDirection="row">
            <Icon
              name="pencil"
              onPress={() =>
                navigate('EditTaskScreen', {
                  taskId: id,
                })
              }
            />
            <Icon name="trash" onPress={() => onDeleteTask(id)} />
          </Box>
        </Box>

        <Box mt="s16" gap="s12">
          {description && <Text>{description}</Text>}
          <Text>{category}</Text>
          <Text>{priority}</Text>

          {tags && tags.length > 0 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 8 }}>
              {tags.map(tagLabel => (
                <Tag key={tagLabel} label={tagLabel} />
              ))}
            </ScrollView>
          )}
        </Box>

        <Box mt="s24">
          <TitleBar title="Note" linkText="Add note" mb="s16" />
        </Box>

        <Box mt="s24">
          <TitleBar title="Comments" linkText="Add comment" mb="s16" />

          <FlatList
            data={comments}
            keyExtractor={item => item.id}
            ListEmptyComponent={() => renderEmptyComments()}
            contentContainerStyle={{ gap: 16 }}
            renderItem={({ item }) => (
              <Box
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                flex={1}>
                <Text>{item.content}</Text>
                <Text preset="paragraphSmall" color="neutral600">{formatRelative(item.created_at)}</Text>
              </Box>
            )}
          />
        </Box>
      </Box>
    );
  }

  return (
    <Box p="s16">
      {isLoading && <ActivityIndicator color="primary" size={56} />}
      {task && renderTaskDetails()}
    </Box>
  );
}
