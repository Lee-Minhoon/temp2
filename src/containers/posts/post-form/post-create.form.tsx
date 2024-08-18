import { PostCreate, useCreatePost } from "@/apis";
import { FormField } from "@/components";
import { PageRoutes } from "@/constants";
import { useSafePush } from "@/hooks";
import { toUrl } from "@/utils";
import { Button, Flex } from "@chakra-ui/react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const PostCreateForm = () => {
  const { push: push } = useSafePush();
  const { handleSubmit, control } = useForm<PostCreate>();
  const { mutate: createPost, isLoading, isSuccess } = useCreatePost();
  const { t } = useTranslation();

  return (
    <Flex
      as={"form"}
      direction="column"
      gap={"4"}
      onSubmit={handleSubmit(
        useCallback(
          (data) =>
            createPost(data, {
              onSuccess: (res) => {
                push({
                  pathname: toUrl(PageRoutes.PostDetail, { id: res.data }),
                });
              },
            }),
          [createPost, push]
        )
      )}
    >
      <FormField
        label={t("Title")}
        fieldType={"string"}
        control={control}
        name={"title"}
        isRequired
        placeholder={t("Title")}
      />
      <FormField fieldType={"document"} control={control} name={"content"} />
      <Button
        type={"submit"}
        isLoading={isLoading || isSuccess}
        isDisabled={isLoading || isSuccess}
        alignSelf={"flex-end"}
      >
        {t("Submit")}
      </Button>
    </Flex>
  );
};

export default PostCreateForm;
